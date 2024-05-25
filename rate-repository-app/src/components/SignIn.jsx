import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

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

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});


const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
    </View>
  );
};

export default SignIn;