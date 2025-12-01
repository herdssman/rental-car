'use client';

import 'react-datepicker/dist/react-datepicker.css';
import css from './Form.module.css';
import iziToast from 'izitoast';
import { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';

registerLocale('en-GB', enGB);

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });
  const [date, setDate] = useState<Date | null>(null);
  const datePickerRef = useRef<ReactDatePicker>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
    setTimeout(() => {
      if (datePickerRef.current) {
        datePickerRef.current.setOpen(false);
      }
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    iziToast.success({
      title: 'Form submitted!',
      message:
        'You have successfully submitted the form. We will get in touch with you shortly.',
      position: 'topCenter',
    });
    setForm({ name: '', email: '', date: '', comment: '' });
    setDate(null);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={css.inputWrapper}>
        <label>
          <span className={css.visuallyHidden}>Name</span>
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Name*"
            required
            value={form.name}
            onChange={handleChange}
            aria-required="true"
          />
        </label>
        <label>
          <span className={css.visuallyHidden}>Email</span>
          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Email*"
            required
            value={form.email}
            onChange={handleChange}
            aria-required="true"
          />
        </label>
        <label>
          <span className={css.visuallyHidden}>Booking date</span>
          <div className={css.dateWrapper}>
            <DatePicker
              ref={datePickerRef}
              selected={date}
              onChange={handleDateChange}
              placeholderText="Booking date"
              className={css.input}
              calendarClassName={css.calendar}
              locale="en-GB"
              formatWeekDay={(n) => n.substring(0, 3).toUpperCase()}
              shouldCloseOnSelect={false}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </label>
        <label>
          <span className={css.visuallyHidden}>Comment</span>
          <textarea
            className={css.textarea}
            name="comment"
            rows={4}
            placeholder="Comment"
            value={form.comment}
            onChange={handleChange}
            aria-label="Additional comments"
          ></textarea>
        </label>
      </div>

      <button type="submit" className={css.btn}>
        Send
      </button>
    </form>
  );
};

export default Form;
