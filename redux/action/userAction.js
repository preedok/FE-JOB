import axios from "axios";
import swal from "sweetalert2";

export const loginUsers = (loginForm, router) => async (dispacth) => {
  try {
    const response = await axios.post(
      `https://teal-inquisitive-xerus.cyclic.app/v1/user/login`,
      loginForm
    );
    const token = response.data.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispacth({ type: "USER_LOGIN_SUCCESS", payload: token });
    swal.fire({
      title: "Success Login",
      icon: "success",
    });
    router.push(`/profile/${response.data.data.user_id}`);
  } catch (error) {
    swal.fire({
      icon: "warning",
      title: "Gagal Login",
    });
  }
};

export const loginRecruiter = (loginForm, router) => async (dispacth) => {
  try {
    const response = await axios.post(
      `https://teal-inquisitive-xerus.cyclic.app/v1/company/login`,
      loginForm
    );
    const token = response.data.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("company", JSON.stringify(response.data));
    dispacth({ type: "RECRUITER_LOGIN_SUCCESS", payload: token });
    swal.fire({
      title: "Success Login",
      icon: "success",
    });
    router.push(`/home`);
  } catch (error) {
    swal.fire({
      icon: "warning",
      title: "Gagal Login",
    });
  }
};
