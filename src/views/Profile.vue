<template>
  <div class="profile">
    <div class="container">
      <div class="page-title">
        <h1 class="mb-4"><i class="fa fa-user"></i>Profile Settings</h1>
      </div>
      
      <div class="row align-items-center justify-content-center">
        <div class="col-md-6">
          <div class="intro">
            
            <p>Update your profile information here.</p>
          </div>
        </div>
        
      </div>

      <div class="profile-content mt-5">
        <!-- Display User Information -->
        <div class="user-info">
          <h4>Admin Information</h4>

          <p><strong>Email:</strong> {{ account.email }}</p>
          <!-- Add more user information fields as needed -->
          <div class="col-md-4 reset" >
                  <button class="btn btn-success btn-block" @click="resetPassword">Reset Password Email</button>
                </div>
        </div>

  
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import {
  getDocs,
  updateDoc,
  query,
  collection,
  where
} from "firebase/firestore";

import Swal from "sweetalert2";

export default {
  name: "profile",
  data() {
    return {
      activeTab: 'profile',
      profile: {
        name: null,
        phone: null,
        address: null,
        postCode: null
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null
      }
    };
  },
  async created() {
    // Fetch user profile information from Firestore
    try {
      const user = auth.currentUser;
      const querySnapshot = await getDocs(query(collection(db, "profiles"), where("email", "==", user.email)));

      if (!querySnapshot.empty) {
        const profileData = querySnapshot.docs[0].data();
        this.profile = {
          name: profileData.name || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          postCode: profileData.postCode || ''
        };
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }

    // Fetch user account information from Firebase Authentication
    const user = auth.currentUser;
    if (user) {
      this.account = {
        name: user.displayName || '',
        email: user.email || '',
        photoUrl: user.photoURL || '',
        emailVerified: user.emailVerified || false,
        uid: user.uid
      };
    }
  },
  methods: {
    async updateProfile() {
      try {
        const user = auth.currentUser;
        await updateProfile(user, {
          displayName: this.profile.name,
        });
        // Update user profile information in Firestore
        await updateDoc(query(collection(db, "profiles"), where("email", "==", user.email)).docs[0].ref, {
          name: this.profile.name,
          phone: this.profile.phone,
          address: this.profile.address,
          postCode: this.profile.postCode
        });
        await Swal.fire({
          icon: "success",
          title: "Profile updated successfully"
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        await Swal.fire({
          icon: "error",
          title: "Error updating profile",
          text: error.message
        });
      }
    },
    updateAccount() {
      // Implement account update logic
    },
    resetPassword() {
      // Send password reset email
      sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Email sent',
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        });
    },
    uploadImage(e) {
      // Implement image upload logic
    }
  }
};
</script>

<style scoped lang="scss">
.profile {
  .intro {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .nav-pills {
    margin-bottom: 20px;
  }

  .profile-form,
  .account-form {
    margin-bottom: 20px;
  }

  .mb-3 {
    margin-bottom: 15px;
  }

  .user-info {
    margin-bottom: 20px;
  }
}
.reset {
  margin-left: 27rem;
}
.page-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.page-title h1 {
  display: flex;
  align-items: center;
  font-size: 2rem;
}

.page-title h1 i {
  margin-right: 10px;
  font-size: 1.5rem;
}
</style>
