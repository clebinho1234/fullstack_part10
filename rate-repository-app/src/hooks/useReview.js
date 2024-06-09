import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient , useMutation } from '@apollo/client'
import { useNavigate } from "react-router-dom";

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient()
    const navigate = useNavigate();
  
    const review = async ({ ownerName, repositoryName, rating, text }) => {
        const { data } = await mutate({  variables: { review: {
            ownerName,
            repositoryName,
            rating,
            text,
        } } })
        apolloClient.resetStore();
        navigate(`/${data.createReview.repositoryId}`);
    };
  
    return [review, result];
};

export default useReview