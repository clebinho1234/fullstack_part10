import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useReview from '../hooks/useReview';

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

const ReviewFormContainer = ({ formik }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    formik.touched.ownerName && formik.errors.ownerName && styles.inputError,
                ]}
                placeholder="Repository owner name"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.textError}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    formik.touched.repositoryName && formik.errors.repositoryName && styles.inputError,
                ]}
                placeholder="Repository name"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.textError}>{formik.errors.repositoryName}</Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    formik.touched.rating && formik.errors.rating && styles.inputError,
                ]}
                placeholder="Rating between 0 and 100"
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
                keyboardType="numeric"
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.textError}>{formik.errors.rating}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Review"
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
                multiline
            />
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Create Review</Text>
            </Pressable>
        </View>
      );
};

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository username is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be at least 0')
        .max(100, 'Rating must be at most 100'),
    text: yup.string(),
});

const ReviewForm = () => {
  const [review] = useReview();

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            await review({
                    ownerName,
                    repositoryName,
                    rating: parseInt(rating, 10),
                    text,
            });
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
    <ReviewFormContainer formik={formik}/>
  );
};

export default ReviewForm;