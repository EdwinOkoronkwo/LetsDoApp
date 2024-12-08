// import React, { useState } from "react";
// import { Form, Input, Button, Modal, Upload, message } from "antd";
// import { useAuth } from "../../context/authContext";
// import { UploadOutlined } from "@ant-design/icons";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const AuthForm = ({ isModalOpen, closeModal }) => {
//   const [form] = Form.useForm();
//   const { signIn, signUp, loading, error, setError } = useAuth();
//   const [isRegistering, setIsRegistering] = useState(false);
//   const history = useHistory(); // Initialize useHistory hook

//   const onFinish = async (values) => {
//     const payload = isRegistering
//       ? { ...values } // For signup, send all values
//       : { email: values.email, password: values.password }; // For signin, send email and password only

//     console.log("Payload being sent:", payload);

//     try {
//       if (isRegistering) {
//         await signUp(payload, closeModal);
//       } else {
//         await signIn(payload, closeModal);
//       }
//     } catch (err) {
//       console.error("Error during authentication:", err);
//     }
//   };

//   const toggleMode = () => {
//     setIsRegistering((prev) => !prev);
//     form.resetFields();
//     if (error) setError("");
//   };

//   const handleCancel = () => {
//     closeModal();
//     form.resetFields();
//     if (error) setError("");
//   };

//   return (
//     <Modal
//       title={isRegistering ? "Register" : "Login"}
//       visible={isModalOpen}
//       onCancel={handleCancel}
//       footer={null}
//     >
//       {error && <div className="error-message">{error}</div>}
//       <Form
//         form={form}
//         onFinish={onFinish}
//         layout="vertical"
//         style={{ maxWidth: "400px", margin: "auto" }}
//       >
//         {isRegistering && (
//           <>
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[
//                 { required: true, message: "Please input your name!" },
//                 { min: 3, message: "Name must be at least 3 characters" },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Photo URL"
//               name="photo"
//               rules={[
//                 { type: "url", message: "Please enter a valid photo URL" },
//               ]}
//             >
//               <Input placeholder="e.g., https://example.com/photo.jpg" />
//             </Form.Item>
//           </>
//         )}

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: "Please input your email!" },
//             { type: "email", message: "Please input a valid email!" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             { required: true, message: "Please input your password!" },
//             { min: 6, message: "Password must be at least 6 characters" },
//           ]}
//           tooltip="Password must be at least 6 characters long."
//         >
//           <Input.Password visibilityToggle />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             style={{ width: "100%" }}
//           >
//             {isRegistering ? "Register" : "Login"}
//           </Button>
//         </Form.Item>
//       </Form>
//       <Button
//         type="link"
//         htmlType="button"
//         onClick={toggleMode}
//         style={{ width: "100%" }}
//       >
//         {isRegistering
//           ? "Already have an account? Login"
//           : "Don't have an account? Register"}
//       </Button>
//     </Modal>
//   );
// };

// export default AuthForm;

// import React, { useState } from "react";
// import { Form, Input, Button, Modal, Upload, message } from "antd";
// import { useAuth } from "../../context/authContext";
// import { UploadOutlined } from "@ant-design/icons";

// const AuthForm = ({ isModalOpen, closeModal }) => {
//   const [form] = Form.useForm();
//   const [isRegistering, setIsRegistering] = useState(false);
//   const {
//     signUp,
//     signIn,
//     signupLoading,
//     signinLoading,
//     signupError,
//     signinError,
//   } = useAuth();

//   const [fileList, setFileList] = useState([]);

//   const onFinish = (values) => {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("email", values.email);
//     formData.append("password", values.password);

//     if (values.photo) {
//       formData.append("photo", values.photo[0]); // Append the photo if it's selected
//     }

//     signUp(formData, closeModal);
//   };

//   const toggleMode = () => {
//     setIsRegistering((prev) => !prev);
//     form.resetFields();
//     setFileList([]); // Reset the file list when switching modes
//   };

//   const handleCancel = () => {
//     closeModal();
//     form.resetFields();
//     setFileList([]); // Reset the file list on modal close
//   };

//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const customRequest = ({ file, onSuccess, onError }) => {
//     // In case you need to handle the file upload logic on the client side (if needed)
//     onSuccess("ok");
//   };

//   return (
//     <Modal
//       title={isRegistering ? "Register" : "Login"}
//       visible={isModalOpen}
//       onCancel={handleCancel}
//       footer={null}
//     >
//       {signupError && (
//         <div className="error-message">{signupError.message}</div>
//       )}
//       {signinError && (
//         <div className="error-message">{signinError.message}</div>
//       )}

//       <Form form={form} onFinish={onFinish} layout="vertical">
//         {isRegistering && (
//           <>
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[{ required: true, message: "Please input your name!" }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Photo"
//               name="photo"
//               rules={[{ required: true, message: "Please upload a photo!" }]}
//             >
//               <Upload
//                 action={customRequest} // You can specify an upload action URL here if needed
//                 listType="picture"
//                 fileList={fileList}
//                 onChange={handleUploadChange}
//                 maxCount={1} // Limit to one file
//                 beforeUpload={() => false} // Prevent automatic upload; you handle it on form submission
//               >
//                 <Button icon={<UploadOutlined />}>Upload Photo</Button>
//               </Upload>
//             </Form.Item>
//           </>
//         )}

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: "Please input your email!" },
//             { type: "email", message: "Please input a valid email!" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={signupLoading || signinLoading}
//             style={{ width: "100%" }}
//           >
//             {isRegistering ? "Register" : "Login"}
//           </Button>
//         </Form.Item>
//       </Form>

//       <Button type="link" onClick={toggleMode} style={{ width: "100%" }}>
//         {isRegistering
//           ? "Already have an account? Login"
//           : "Don't have an account? Register"}
//       </Button>
//     </Modal>
//   );
// };

// export default AuthForm;

// import React, { useState } from "react";
// import { Form, Input, Button, Modal, Upload, message } from "antd";
// import { useAuth } from "../../context/authContext";
// import { UploadOutlined } from "@ant-design/icons";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const AuthForm = ({ isModalOpen, closeModal }) => {
//   const [form] = Form.useForm();
//   const { signIn, signUp, loading, error, setError } = useAuth();
//   const [isRegistering, setIsRegistering] = useState(false);
//   const history = useHistory(); // Initialize useHistory hook

//   // Handle file upload change
//   const handleUploadChange = (info) => {
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   };

//   const onFinish = async (values) => {
//     const payload = isRegistering
//       ? { ...values } // For signup, send all values including photo URL or file
//       : { email: values.email, password: values.password }; // For signin, send email and password only

//     console.log("Payload being sent:", payload);

//     try {
//       if (isRegistering) {
//         await signUp(payload, closeModal);
//       } else {
//         await signIn(payload, closeModal);
//       }
//     } catch (err) {
//       console.error("Error during authentication:", err);
//     }
//   };

//   const toggleMode = () => {
//     setIsRegistering((prev) => !prev);
//     form.resetFields();
//     if (error) setError("");
//   };

//   const handleCancel = () => {
//     closeModal();
//     form.resetFields();
//     if (error) setError("");
//   };

//   return (
//     <Modal
//       title={isRegistering ? "Register" : "Login"}
//       visible={isModalOpen}
//       onCancel={handleCancel}
//       footer={null}
//     >
//       {error && <div className="error-message">{error}</div>}
//       <Form
//         form={form}
//         onFinish={onFinish}
//         layout="vertical"
//         style={{ maxWidth: "400px", margin: "auto" }}
//       >
//         {isRegistering && (
//           <>
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[
//                 { required: true, message: "Please input your name!" },
//                 { min: 3, message: "Name must be at least 3 characters" },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             {/* Photo Upload Field */}
//             <Form.Item
//               label="Profile Picture"
//               name="photo"
//               valuePropName="fileList"
//               getValueFromEvent={(e) => e && e.fileList}
//               extra="Upload a profile picture (optional)"
//             >
//               <Upload
//                 name="photo"
//                 listType="picture"
//                 action="/upload" // Your API endpoint for handling file uploads
//                 onChange={handleUploadChange}
//                 beforeUpload={() => false} // Prevent automatic upload
//               >
//                 <Button icon={<UploadOutlined />}>Click to upload</Button>
//               </Upload>
//             </Form.Item>

//             <Form.Item
//               label="Photo URL"
//               name="photoURL"
//               rules={[
//                 { type: "url", message: "Please enter a valid photo URL" },
//               ]}
//             >
//               <Input placeholder="e.g., https://example.com/photo.jpg" />
//             </Form.Item>
//           </>
//         )}

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: "Please input your email!" },
//             { type: "email", message: "Please input a valid email!" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             { required: true, message: "Please input your password!" },
//             { min: 6, message: "Password must be at least 6 characters" },
//           ]}
//           tooltip="Password must be at least 6 characters long."
//         >
//           <Input.Password visibilityToggle />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             style={{ width: "100%" }}
//           >
//             {isRegistering ? "Register" : "Login"}
//           </Button>
//         </Form.Item>
//       </Form>
//       <Button
//         type="link"
//         htmlType="button"
//         onClick={toggleMode}
//         style={{ width: "100%" }}
//       >
//         {isRegistering
//           ? "Already have an account? Login"
//           : "Don't have an account? Register"}
//       </Button>
//     </Modal>
//   );
// };

// export default AuthForm;

// import React, { useState } from "react";
// import { Form, Input, Button, Modal, Upload, message } from "antd";
// import { useAuth } from "../../context/authContext";
// import { UploadOutlined } from "@ant-design/icons";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const AuthForm = ({ isModalOpen, closeModal }) => {
//   const [form] = Form.useForm();
//   const { signIn, signUp, loading, error, setError } = useAuth();
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [fileList, setFileList] = useState([]); // To store file upload list
//   const history = useHistory();

//   // Handle file upload change
//   const handleUploadChange = (info) => {
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//       setFileList(info.fileList); // Store the file in state
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   };

//   const onFinish = async (values) => {
//     const payload = isRegistering
//       ? {
//           ...values,
//           photo: fileList.length > 0 ? fileList[0].response : null, // Include the uploaded photo URL
//         }
//       : { email: values.email, password: values.password };

//     console.log("Payload being sent:", payload);

//     try {
//       if (isRegistering) {
//         await signUp(payload, closeModal);
//       } else {
//         await signIn(payload, closeModal);
//       }
//     } catch (err) {
//       console.error("Error during authentication:", err);
//     }
//   };

//   const toggleMode = () => {
//     setIsRegistering((prev) => !prev);
//     form.resetFields();
//     if (error) setError("");
//   };

//   const handleCancel = () => {
//     closeModal();
//     form.resetFields();
//     if (error) setError("");
//   };

//   return (
//     <Modal
//       title={isRegistering ? "Register" : "Login"}
//       visible={isModalOpen}
//       onCancel={handleCancel}
//       footer={null}
//     >
//       {error && <div className="error-message">{error}</div>}
//       <Form
//         form={form}
//         onFinish={onFinish}
//         layout="vertical"
//         style={{ maxWidth: "400px", margin: "auto" }}
//       >
//         {isRegistering && (
//           <>
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[
//                 { required: true, message: "Please input your name!" },
//                 { min: 3, message: "Name must be at least 3 characters" },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             {/* Photo Upload Field */}
//             <Form.Item
//               label="Profile Picture"
//               name="photo"
//               valuePropName="fileList"
//               getValueFromEvent={(e) => e && e.fileList}
//               extra="Upload a profile picture (optional)"
//             >
//               <Upload
//                 name="photo"
//                 listType="picture"
//                 action="/upload" // Your API endpoint for handling file uploads
//                 onChange={handleUploadChange}
//                 beforeUpload={() => false} // Prevent automatic upload
//               >
//                 <Button icon={<UploadOutlined />}>Click to upload</Button>
//               </Upload>
//             </Form.Item>

//             <Form.Item
//               label="Photo URL"
//               name="photoURL"
//               rules={[
//                 { type: "url", message: "Please enter a valid photo URL" },
//               ]}
//             >
//               <Input placeholder="e.g., https://example.com/photo.jpg" />
//             </Form.Item>
//           </>
//         )}

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: "Please input your email!" },
//             { type: "email", message: "Please input a valid email!" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             { required: true, message: "Please input your password!" },
//             { min: 6, message: "Password must be at least 6 characters" },
//           ]}
//           tooltip="Password must be at least 6 characters long."
//         >
//           <Input.Password visibilityToggle />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             style={{ width: "100%" }}
//           >
//             {isRegistering ? "Register" : "Login"}
//           </Button>
//         </Form.Item>
//       </Form>
//       <Button
//         type="link"
//         htmlType="button"
//         onClick={toggleMode}
//         style={{ width: "100%" }}
//       >
//         {isRegistering
//           ? "Already have an account? Login"
//           : "Don't have an account? Register"}
//       </Button>
//     </Modal>
//   );
// };

// export default AuthForm;

import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload, message, DatePicker } from "antd";
import { useAuth } from "../../context/authContext";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthForm = ({ isModalOpen, closeModal }) => {
  const [form] = Form.useForm();
  const { signIn, signUp, loading, error, setError } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [fileList, setFileList] = useState([]); // To store file upload list
  const history = useHistory();

  // Handle file upload change
  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setFileList(info.fileList); // Store the file in state
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = async (values) => {
    const payload = isRegistering
      ? {
          ...values,
          photo: fileList.length > 0 ? fileList[0].response : null, // Include the uploaded photo URL
        }
      : { email: values.email, password: values.password };

    console.log("Payload being sent:", payload);

    try {
      if (isRegistering) {
        await signUp(payload, closeModal);
      } else {
        await signIn(payload, closeModal);
      }
    } catch (err) {
      console.error("Error during authentication:", err);
    }
  };

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    form.resetFields();
    if (error) setError("");
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
    if (error) setError("");
  };

  return (
    <Modal
      title={isRegistering ? "Register" : "Login"}
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {error && <div className="error-message">{error}</div>}
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        {isRegistering && (
          <>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your name!" },
                { min: 3, message: "Name must be at least 3 characters" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Age Field */}
            <Form.Item
              label="Phone number"
              name="phone_number"
              rules={[{ required: true, message: "Please input your age!" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>

            {/* Date of Birth Field */}
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please input your date of birth!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            {/* Address Field */}
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Photo Upload Field */}
            <Form.Item
              label="Profile Picture"
              name="photo"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              extra="Upload a profile picture (optional)"
            >
              <Upload
                name="photo"
                listType="picture"
                action="/upload" // Your API endpoint for handling file uploads
                onChange={handleUploadChange}
                beforeUpload={() => false} // Prevent automatic upload
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Photo URL"
              name="photoURL"
              rules={[
                { type: "url", message: "Please enter a valid photo URL" },
              ]}
            >
              <Input placeholder="e.g., https://example.com/photo.jpg" />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
          tooltip="Password must be at least 6 characters long."
        >
          <Input.Password visibilityToggle />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            {isRegistering ? "Register" : "Login"}
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        htmlType="button"
        onClick={toggleMode}
        style={{ width: "100%" }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </Button>
    </Modal>
  );
};

export default AuthForm;
