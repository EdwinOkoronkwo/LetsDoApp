import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Avatar,
  Modal,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useUsers from "../hooks/useUsers";
import useLoggedInUser from "../../../state/auth/hooks/useLoggedInUser";
import moment from "moment";

const ProfileUpdateForm = ({ isModalOpen, closeModal }) => {
  const { updateUserProfileMutation } = useUsers();
  const loggedInUser = useLoggedInUser();
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    form.setFieldsValue({
      name: loggedInUser?.name || "",
      photo: loggedInUser?.photo || "",
      phone_number: loggedInUser?.phone_number || "",
      address: loggedInUser?.address || "",
      date_of_birth: loggedInUser?.date_of_birth
        ? moment(loggedInUser.date_of_birth)
        : null, // Format to moment
    });
  }, [loggedInUser, form]);

  const handleUpload = (file) => {
    console.log("File being uploaded in updateProfile:", file);
    setPhoto(file);
    return false; // Prevent automatic upload by Ant Design
  };

  const onFinish = async (values) => {
    try {
      const { name, phone_number, address, date_of_birth } = values;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone_number", phone_number);
      formData.append("address", address);
      formData.append(
        "date_of_birth",
        date_of_birth ? date_of_birth.format("YYYY-MM-DD") : ""
      ); // Format date_of_birth to YYYY-MM-DD

      if (photo) {
        formData.append("photo_file", photo);
      } else {
        message.error("Please upload a profile picture.");
        return;
      }

      // Debug: Log FormData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Call updateUserProfileMutation using mutateAsync
      await updateUserProfileMutation({
        id: loggedInUser?.id,
        userData: formData,
      });

      message.success("Profile updated successfully!");
      closeModal();
    } catch (err) {
      message.error("Error updating profile.");
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Modal
      title="Update Profile"
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}
      destroyOnClose
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input defaultValue={loggedInUser?.name} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input defaultValue={loggedInUser?.phone_number} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input defaultValue={loggedInUser?.address} />
        </Form.Item>

        {/* <Form.Item label="Date of Birth" name="date_of_birth">
          <DatePicker
            defaultValue={
              loggedInUser?.date_of_birth
                ? moment(loggedInUser.date_of_birth)
                : null
            }
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
          />
        </Form.Item> */}

        <Form.Item
          label="Profile Picture"
          name="photo_file"
          rules={[
            { required: !photo, message: "Please upload a profile picture!" },
          ]}
        >
          <Upload
            accept="image/*"
            beforeUpload={handleUpload}
            showUploadList={false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {photo ? (
            <Avatar
              src={URL.createObjectURL(photo)}
              size={64}
              style={{ marginTop: 10 }}
            />
          ) : (
            loggedInUser?.photo && (
              <Avatar
                src={`http://localhost:8000${loggedInUser?.photo}`}
                size={64}
                style={{ marginTop: 10 }}
              />
            )
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileUpdateForm;
