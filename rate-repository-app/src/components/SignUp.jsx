import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: theme.margin.marginBottom,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    button: {
        width: '80%',
        padding: 15,
        marginVertical: theme.margin.marginTop,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.bold,
    },
    textError: {
        color: theme.colors.error, 
        alignSelf:'baseline', 
        paddingLeft: 50,
    },
});

export const SignUpContainer = ({ formik }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    formik.touched.username && formik.errors.username && styles.inputError
                ]}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
            <Text style={styles.textError}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    formik.touched.password && formik.errors.password && styles.inputError
                ]}
                placeholder="Password"
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
            <Text style={styles.textError}>{formik.errors.password}</Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.inputError
                ]}
                placeholder="PasswordConfirmation"
                secureTextEntry={true}
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <Text style={styles.textError}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
        </View>
      );
};

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(5,'Username must be at least 5 caractheres')
        .max(30, 'Username must be at most 30 caractheres'),
    password: yup
        .string()
        .required('Password is required')
        .min(5,'Password must be at least 5 caractheres')
        .max(30, 'Password must be at most 30 caractheres'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required('Password confirmation is required')
});

const SignUp = () => {
  const [signUp] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signUp({ username, password });
        } catch (e) {
            console.log(e);
        }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <SignUpContainer formik={formik}/>
  );
};

export default SignUp;