'use client';

import 'react-datepicker/dist/react-datepicker.css';
import css from './Form.module.css';
import iziToast from 'izitoast';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';

registerLocale('en-GB', enGB);

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });
  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Name*"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Email*"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <div className="date-wrapper">
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            placeholderText="Booking date"
            className={css.input}
            calendarClassName={css.calendar}
            locale="en-GB"
            formatWeekDay={(n) => n.substring(0, 3).toUpperCase()}
          />
        </div>
        <label>
          <textarea
            className={css.textarea}
            name="comment"
            rows={4}
            placeholder="Comment"
            value={form.comment}
            onChange={handleChange}
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
