const API_BASE_URL = "https://4dhj4dff-8000.uks1.devtunnels.ms";

export const registerUser = async (userData) => {
  try {
    console.log("SENDING REGISTRATION DATA:", userData);

    const response = await fetch(
      `${API_BASE_URL}/api/auth/register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    console.log("REGISTER STATUS:", response.status);
    console.log("REGISTER RESPONSE:", data);

    if (!response.ok) {
      // Convert Django validation errors into readable text
      let errorMessage = "Registration failed.";

      if (data?.detail) {
        errorMessage = data.detail;
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (typeof data === "object") {
        const errors = Object.entries(data)
          .map(([field, messages]) => {
            const message = Array.isArray(messages)
              ? messages.join(", ")
              : String(messages);

            return `${field}: ${message}`;
          })
          .join("\n");

        if (errors) {
          errorMessage = errors;
        }
      }

      throw new Error(errorMessage);
    }

    return data;

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    throw error;
  }
};

// LOGIN USER
export const loginUser = async (loginData) => {
    try {
      console.log("SENDING LOGIN DATA:", loginData);
  
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
  
      const data = await response.json();
  
      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN RESPONSE:", data);
  
      if (!response.ok) {
        let errorMessage = "Login failed.";
  
        if (data?.detail) {
          errorMessage = data.detail;
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (typeof data === "object") {
          const errors = Object.entries(data)
            .map(([field, messages]) => {
              const message = Array.isArray(messages)
                ? messages.join(", ")
                : String(messages);
  
              return `${field}: ${message}`;
            })
            .join("\n");
  
          if (errors) {
            errorMessage = errors;
          }
        }
  
        throw new Error(errorMessage);
      }
  
      return data;
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      throw error;
    }
  };

  // VERIFY OTP
export const verifyOTP = async (otpData) => {
  try {
    console.log("SENDING OTP DATA:", otpData);

    const response = await fetch(
      `${API_BASE_URL}/api/auth/verify-otp/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(otpData),
      }
    );

    const data = await response.json();

    console.log("OTP VERIFY STATUS:", response.status);
    console.log("OTP VERIFY RESPONSE:", data);

    if (!response.ok) {
      let errorMessage = "OTP verification failed.";

      if (data?.detail) {
        errorMessage = data.detail;
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (typeof data === "object") {
        const errors = Object.entries(data)
          .map(([field, messages]) => {
            const message = Array.isArray(messages)
              ? messages.join(", ")
              : String(messages);

            return `${field}: ${message}`;
          })
          .join("\n");

        if (errors) {
          errorMessage = errors;
        }
      }

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.log("OTP VERIFY ERROR:", error);
    throw error;
  }
};


// RESEND OTP
export const resendOTP = async (email) => {
  try {
    console.log("RESENDING OTP TO:", email);

    const response = await fetch(
      `${API_BASE_URL}/api/auth/resend-otp/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const data = await response.json();

    console.log("OTP RESEND STATUS:", response.status);
    console.log("OTP RESEND RESPONSE:", data);

    if (!response.ok) {
      let errorMessage = "Could not resend OTP.";

      if (data?.detail) {
        errorMessage = data.detail;
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (typeof data === "object") {
        const errors = Object.entries(data)
          .map(([field, messages]) => {
            const message = Array.isArray(messages)
              ? messages.join(", ")
              : String(messages);

            return `${field}: ${message}`;
          })
          .join("\n");

        if (errors) {
          errorMessage = errors;
        }
      }

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.log("OTP RESEND ERROR:", error);
    throw error;
  }
};