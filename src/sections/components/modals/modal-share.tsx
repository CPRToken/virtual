import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { QuillEditor } from 'src/components/quill-editor';

const MyDatePicker = ({ field, form, ...other }) => {
  return (
    <DatePicker
      {...field}
      {...other}
      onChange={(date) => form.setFieldValue(field.name, date)}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export const ShareModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: '20px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Formik
            initialValues={{ email: '', date: null }}
            onSubmit={(values) => {
              // Send data to your email.ts handler
              fetch('/api/email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: values.email,
                  link: 'YOUR_VIDEO_LINK_HERE', // Replace with your video link
                }),
              });
            }}
          >
            {() => (
              <Form>
                <Field name="email" as={TextField} label="Friend's Email" />
                <Field name="date" component={MyDatePicker} label="Send on" />
                <Button type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
