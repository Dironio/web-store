import { User } from "../../App";
import EditProfileForm from "../../components/ProfileForm/EditProfileForm";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import BirthdayComponent from "../../components/UI/BirthdayComponent";
import GenderChoice from "../../components/UI/GenderChoice";
import '../ProfilePage/ProfilePage.css'

interface ProfilePageProps {
    user: User | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {

    return (
        <div className="wrapper">


            <form action="">
                <ProfileForm user={user} />
            </form>


            <form action="">
                <EditProfileForm user={user} />
            </form>



            
        </div>
    )
}


export default ProfilePage;