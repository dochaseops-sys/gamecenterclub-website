import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Checkbox,
  Typography,
  message,
  Card,
} from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

export function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

const onFinish = async (values: any) => {
  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("FullName", values.FullName);
    formData.append("Email", values.Email);
    formData.append("Password", values.Password);
    formData.append("DateOfBirth", values.DateOfBirth.format("DD/MM/YYYY"));
    formData.append("Gender", values.Gender);
    formData.append("WhatsappNumber", values.WhatsappNumber);
    formData.append("TelegramNumber", values.TelegramNumber || "");

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwWrkiLTgbFhzceVP7vU47QlSqfyJZIKaV3s76TTUqPXpa2HCrs6utraXZdJ2OyZpL8/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    const resultText = await response.text();
    console.log("Response text:", resultText);

    if (response.ok && !resultText.trim().startsWith("{")) {
      message.success({
        content: "🎉 Account created successfully!",
        duration: 3,
      });
      form.resetFields();
      return;
    }

    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = {};
    }

    if (result.result === "success" || result.status === "success") {
      message.success({
        content: "🎉 Account created successfully!",
        duration: 3,
      });
      form.resetFields();
    } else {
      message.error("Failed to save data. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    message.error("An error occurred while saving data.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#f9fafb] via-[#f5f7fa] to-[#eef2f7]">
      <Card
        className="w-full max-w-lg rounded-3xl shadow-lg border border-gray-100"
        bodyStyle={{ padding: "2rem" }}
      >
        <div className="text-center mb-8">
          <Title
            level={2}
            className="!mb-2 !text-gray-900 !font-bold tracking-tight"
          >
            Create Your Account
          </Title>
          <Text type="secondary" className="text-base">
            Join thousands earning daily rewards effortlessly
          </Text>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
          className="space-y-4"
        >
          <Form.Item
            name="FullName"
            label={<span className="font-medium text-gray-700">Full Name</span>}
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input size="large" placeholder="John Doe" className="h-12 rounded-xl" />
          </Form.Item>

          <Form.Item
            name="Email"
            label={<span className="font-medium text-gray-700">Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="john@example.com" className="h-12 rounded-xl" />
          </Form.Item>

          <Form.Item
            name="Password"
            label={<span className="font-medium text-gray-700">Password</span>}
            rules={[
              { required: true, message: "Please create a password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password size="large" placeholder="Create a password" className="h-12 rounded-xl" />
          </Form.Item>

          <Form.Item
            name="DateOfBirth"
            label={<span className="font-medium text-gray-700">Date of Birth</span>}
            rules={[{ required: true, message: "Please select your date of birth" }]}
          >
            <DatePicker
              size="large"
              className="w-full h-12 rounded-xl"
              format="DD/MM/YYYY"
              disabledDate={(current) => current && current > dayjs().endOf("day")}
            />
          </Form.Item>

          <Form.Item
            name="Gender"
            label={<span className="font-medium text-gray-700">Gender</span>}
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select size="large" placeholder="Select gender" className="rounded-xl">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
              <Option value="prefer-not-to-say">Prefer not to say</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="WhatsappNumber"
            label={<span className="font-medium text-gray-700">WhatsApp Number</span>}
            rules={[{ required: true, message: "Please enter your WhatsApp number" }]}
          >
            <Input size="large" placeholder="+234 800 000 0000" className="h-12 rounded-xl" />
          </Form.Item>

          <Form.Item
            name="TelegramNumber"
            label={<span className="font-medium text-gray-700">Telegram Number</span>}
          >
            <Input size="large" placeholder="+234 800 000 0000" className="h-12 rounded-xl" />
            <Text type="secondary" className="text-xs">Optional</Text>
          </Form.Item>

          <Form.Item
            name="agreedToTerms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("You must agree to the terms"),
              },
            ]}
          >
            <Checkbox className="text-gray-700">
              I agree to the{" "}
              <a
                href="https://www.dochase.com/terms-and-conditions/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://www.dochase.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full h-12 !bg-[#015f78] rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              loading={loading}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <Text type="secondary">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
