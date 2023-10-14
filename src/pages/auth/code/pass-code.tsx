import React, { useEffect } from 'react';

import type { NextPage } from 'next';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/firebase';
import { GuestGuard } from 'src/guards/guest-guard';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { doc, getDoc} from "firebase/firestore";
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { paths } from 'src/paths';
import { db, auth, storage } from 'src/libs/firebase';
import { Issuer } from 'src/utils/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



interface Values {

  password: string;
  submit: null;
}



const validationSchema = Yup.object({

  password: Yup.string().max(255).required('Password is required'),
});

const Page: NextPage = () => {
  const router = useRouter();

  // Instantiate the Firebase auth only once
  const auth = getAuth();

  const formik = useFormik({
    initialValues: {

      password: '',
    },
    validationSchema,

    onSubmit: async (values, { resetForm, setSubmitting, setErrors }) => {
      try {
        const userCredential = await (auth, values.password);
        const user = userCredential.user;

        if (user) {
          const uid = user.uid;
          // Assuming you've imported firestore methods and your db instance at the top
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const userUrl = userData?.userUrl;
            if (userUrl) {
              router.push(`/profile/${userUrl}`);
            } else {
              // Handle error or redirect to a default path if userUrl is not available
              router.push(paths.profile.userUrl);
            }
          } else {
            console.error("No such user!");
            setErrors({ email: "Unexpected error. Please try again." });
          }
        }
        resetForm();
      } catch (error) {
        console.error('Error during sign in:', error);
        setErrors({ email: error.message });
      } finally {
        setSubmitting(false);
      }
    },

  });



  usePageView();

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card elevation={16}>
          <CardHeader




          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>

                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Passcode"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                View Content
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2 }} // Adjust as needed
              >

              </Typography>
            </form>
          </CardContent>
        </Card>
        <Stack
          spacing={3}
          sx={{ mt: 3 }}
        >
        </Stack>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Firebase}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
