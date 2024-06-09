import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryItem';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
      backgroundColor: "lightgrey"
    },
});

const Main = () => {
    return (
      <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/:id" element={<RepositoryItem showGitHub={true} />} />
                <Route path="/create-review" element={<ReviewForm />} />
                <Route path="/user-review" element={<UserReviews />} />
                <Route path="/signin" element={<SignIn />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
      </View>
    );
};

export default Main;