import React, { useEffect, useState, useRef } from "react";

import { Input, Form, Scope, useField } from "@rocketseat/unform";
import * as Yup from "yup";

import ReactDatepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = Yup.object().shape({
  fullname: Yup.string()
    .min(5, "The FULL name is only this?")
    .required("Full name is required."),
  phone: Yup.string()
    .matches(/^[0-9]{9}$/g, "Is this a phone number?")
    .required("Phone is required."),
  email: Yup.string().email("Is this an email?"),
  birthDate: Yup.date().notRequired(),
  address: Yup.object().shape({
    city: Yup.string().notRequired(),
    state: Yup.string().notRequired()
  })
});

const Datepicker = ({ name, label }) => {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "props.selected",
      clearValue: pickerRef => {
        console.log("ran clearValue");
        pickerRef.clear();
      }
    });
  }, [fieldName]); // eslint-disable-line

  return (
    <>
      {!!label && <label>{label}</label>}
      <ReactDatepicker
        name={fieldName}
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
};

function App() {
  // const initialData = {
  //   fullname: "Italo Menezes",
  //   phone: "999999999",
  //   email: "italo@email.com",
  //   address: {
  //     city: "Rio de Janeiro",
  //     state: "Rio de Janeiro"
  //   }
  // };

  const handleSubmit = (data, { resetForm }) => {
    console.log(data);
    resetForm();
  };

  return (
    <div>
      <img
        src="https://raw.githubusercontent.com/Rocketseat/unform/master/assets/logo.png"
        alt="Unform logo"
      />
      <h1>Contact form</h1>

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input className="input" name="fullname" label="Full name" />
        <Input className="input" name="phone" label="Phone" />
        <Input className="input" name="email" label="Email" />

        <Datepicker name="birthDate" label="Birth date" />

        <Scope path="address">
          <Input name="city" label="City" />
          <Input name="state" label="State" />
        </Scope>

        <button type="submit">Save</button>
      </Form>
    </div>
  );
}

export default App;
