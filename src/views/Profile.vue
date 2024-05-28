<template>
  <div class="profile">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-6">
          <div class="intro">
            <h3 class="mb-4">Profile Settings</h3>
            <p>Update your profile information here.</p>
          </div>
        </div>
        <div class="col-md-5">
          <img src="/img/svg/profile.svg" width="300" alt="Profile" class="img-fluid">
        </div>
      </div>

      <div class="profile-content mt-5">
        <ul class="nav nav-pills mb-4">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'"
              style="cursor: pointer;">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'account' }" @click="activeTab = 'account'"
              style="cursor: pointer;">Account Settings</a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane" :class="{ active: activeTab === 'profile' }">
            <div class="profile-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <input type="text" v-model="profile.name" placeholder="Full Name" class="form-control">
                </div>
                <div class="col-md-6 mb-3">
                  <input type="text" v-model="profile.phone" placeholder="Phone Number" class="form-control">
                </div>
                <div class="col-md-12 mb-3">
                  <input type="text" v-model="profile.address" placeholder="Address" class="form-control">
                </div>
                <div class="col-md-8 mb-3">
                  <input type="text" v-model="profile.postCode" placeholder="Postcode" class="form-control">
                </div>
                <div class="col-md-4">
                  <button class="btn btn-primary btn-block" @click="updateProfile">Save Changes</button>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane" :class="{ active: activeTab === 'account' }">
            <div class="account-form">
              <div class="row">
                <div class="col-md">
                  <div class="alert alert-info">
                    Please use the Reset password email button for resetting the password. The form doesn't work
                    currently.
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <input type="text" v-model="account.name" placeholder="User Name" class="form-control">
                </div>
                <div class="col-md-6 mb-3">
                  <input type="text" v-model="account.email" placeholder="Email Address" class="form-control">
                </div>
                <div class="col-md-6 mb-3">
                  <input type="password" v-model="account.password" placeholder="New Password" class="form-control">
                </div>
                <div class="col-md-6 mb-3">
                  <input type="password" v-model="account.confirmPassword" placeholder="Confirm Password"
                    class="form-control">
                </div>
                <div class="col-md-4 mb-3">
                  <input type="file" @change="uploadImage" class="form-control">
                </div>
                <div class="col-md-4">
                  <button class="btn btn-primary btn-block" @click="updateAccount">Save Changes</button>
                </div>
                <div class="col-md-4">
                  <button class="btn btn-success btn-block" @click="resetPassword">Reset Password Email</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase"; // Ensure the correct imports
import { sendPasswordResetEmail} from 'firebase/auth'
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
  methods: {
    async updateProfile() {
      try {
        const user = auth.currentUser;
        // Find the document based on the email
        const querySnapshot = await getDocs(query(collection(db, "profiles"), where("email", "==", user.email)));

        if (querySnapshot.empty) {
          throw new Error("Profile not found for the given email.");
        }

        // Assuming there's only one document for each email
        const profileDoc = querySnapshot.docs[0];


        await updateDoc(profileDoc.ref, {
          name: this.profile.name,
          phone: this.profile.phone,
          adresse: this.profile.address,
          codePost: this.profile.postCode,

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
}
</style>