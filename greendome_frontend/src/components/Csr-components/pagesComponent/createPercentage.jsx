"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "@/components/FormRow";
import {
  getPercentage,
  createPercentage,
} from "@/features/course/percentage/percentageSlice.jsx";

const initialState = {
  percent: "",
};

const CreatePercentage = () => {
  const { percentage, allpercentage } = useSelector(
    (strore) => strore.percentage
  );
  const { isLoading } = useSelector((store) => store.user);
  const [profitRatio, setprofitRatio] = useState(initialState);
  const [trigger, setTrigger] = useState(false);
  const disPatch = useDispatch();

  useEffect(() => {
    disPatch(getPercentage());
    setprofitRatio({ percent: percentage });
  }, [trigger]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setprofitRatio({ ...profitRatio, [name]: value });
  };

  // console.log(percentage);
  // console.log(allpercentage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profitRatio || profitRatio === "") {
      toast.error("please fill all details");
    }
    disPatch(createPercentage(profitRatio.percent));

    const res = await axios.get(
      `http://localhost:8000/greendometech/ng/finance/company/view-percentage`,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
    setTrigger(true);
    console.log(profitRatio.percent);
  };

  return (
    <main>
      {allpercentage.length === undefined || allpercentage.length === 0 ? (
        <form action="">
          <button onClick={handleSubmit} type="submit">
            set percentage
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
      ) : (
        <div>
          {allpercentage.map((i, idx) => {
            const { percentage, _id } = i;
            return (
              <div key={idx}>
                <h2>{`The profit sharing ratio for Greendome technology courses with id ${_id} is set to ${percentage}%`}</h2>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default CreatePercentage;
