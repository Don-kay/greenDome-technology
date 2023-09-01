"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "@/components/FormRow";
import _ from "lodash";
import {
  getPercentage,
  resetPercentage,
  updatePercentage,
  resetUpdateMsg,
  UpdateMsg,
} from "@/features/course/percentage/percentageSlice.jsx";

const initialState = {
  percent: "",
};

const UpdatePercentage = () => {
  const { percentage, allpercentage, updateMsg } = useSelector(
    (strore) => strore.percentage
  );
  const { users } = useSelector((strore) => strore.profiles);
  const { isLoading } = useSelector((store) => store.user);
  const [profitRatio, setprofitRatio] = useState(initialState);
  const [trigger, setTrigger] = useState(false);
  const [sensor, setSensor] = useState(false);
  const [ratioId, setRatioId] = useState("");
  const [modal, setModal] = useState({ show: false, msg: "", type: "" });
  const disPatch = useDispatch();

  const showModal = (show = false, msg = "", type = "") => {
    setModal(show, msg, type);
  };

  useEffect(() => {
    disPatch(getPercentage());
    disPatch(resetUpdateMsg());
    setprofitRatio(sensor ? { percent: 0 } : { percent: percentage });
    setRatioId(_.toString(allpercentage.map((i) => i._id)));
  }, [trigger]);

  useEffect(() => {
    if (updateMsg !== undefined) {
      showModal({ show: true });
    }
    const timeout = setTimeout(() => {
      showModal({ show: false });
      disPatch(resetUpdateMsg());
    }, 5000);

    return () => clearTimeout(timeout);
  }, [updateMsg]);

  const RatioAuthor = _.toString(allpercentage.map((i) => i.createdBy));
  const authorObj = users?.filter((i) => i.id === RatioAuthor);
  const author = authorObj?.map((i) => {
    return i.roles;
  });

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/greendometech/ng/finance/company/delete-percentage/${id}`,
      {
        withCredentials: true,
      }
    );
    const response = res.data.profitRatio;

    // if (newRatio === "") {
    //   setprofitRatio({ percent: 0 });
    // } else {
    //   setprofitRatio({ percent: percentage });
    // }
    const resp = await axios.get(
      `http://localhost:8000/greendometech/ng/finance/company/view-percentage`,
      {
        withCredentials: true,
      }
    );

    // disPatch(resetPercentage());
    setTrigger(true);
    setSensor(resp.data.count === 0);
    //setprofitRatio({ ...profitRatio, [name]: value });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setprofitRatio({ ...profitRatio, [name]: value });
  };

  // console.log(percentage);
  // console.log(percentage);
  //console.log(profitRatio.percent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!profitRatio || profitRatio === "" || ratioId === "") {
        toast.error("please fill all details");
        disPatch(
          UpdateMsg("Error, no percentage to update, set a new percentage")
        );
        // setSensor(false);
        // setTrigger(true);
      } else {
        disPatch(
          updatePercentage({
            params: ratioId,
            percentage: profitRatio.percent,
            party_type: author[0],
          })
        );
      }
    } catch (error) {
      return error;
    }

    // console.log(profitRatio.percent);
    // console.log(ratioId);
  };

  return (
    <main>
      {modal.show && <h2>{updateMsg}</h2>}
      <form action="" onSubmit={handleSubmit}>
        <button onClick={handleSubmit} type="submit">
          update percentage
        </button>
        <div>set percentage %</div>
        <div>
          <FormRow
            type="number"
            name="percent"
            value={profitRatio.percent}
            handleChange={handleChange}
            // handleOnFocus={() => handleOnFocus()}
            // handleOnBlur={handleOnBlur}
          />
        </div>
      </form>
      <div>
        {allpercentage.map((i, idx) => {
          const {
            percentage,
            createdBy,
            party_type,
            createdAt,
            updatedAt,
            _id,
          } = i;
          return (
            <div key={idx}>
              <h2>id: {_id}</h2>
              <h2>ratio: {percentage}</h2>
              <h2>creator: {createdBy}</h2>
              <h2>party_type: {party_type}</h2>
              <h2>createdAt: {createdAt}</h2>
              <h2>updatededAt: {updatedAt}</h2>
              <button onClick={() => handleDelete(_id)}>delete</button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default UpdatePercentage;
