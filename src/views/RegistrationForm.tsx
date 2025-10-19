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

  const payload = {
    fullName: values.fullName,
    email: values.email,
    password: values.password,
    dateOfBirth: values.dateOfBirth.format("DD/MM/YYYY"),
    gender: values.gender,
    whatsappNumber: values.whatsappNumber,
    telegramNumber: values.telegramNumber || "",
  };

  try {
    const params = new URLSearchParams(payload).toString();

    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbzuJetydvZJUUTsxpZKsI-qYAS1nMElWm_qjFg2aaa6mMH6YGypgZ61XsTq0JDkSdo7/exec?${params}`,
      // {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      // }
        {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }
    );

    const result = await response.json();
    if (result.status === "success") {
      message.success("Account created and saved to Google Sheets!");
      form.resetFields();
    } else {
      message.error("Failed to save data. Please try again.");
    }
  } catch (error) {
    message.error("An error occurred while saving data.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#f9fafb] via-[#f5f7fa] to-[#eef2f7]">
      <Card
        className="
          w-full max-w-lg rounded-3xl shadow-lg border border-gray-100"
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
            name="fullName"
            label={<span className="font-medium text-gray-700">Full Name</span>}
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              size="large"
              placeholder="John Doe"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="font-medium text-gray-700">Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="john@example.com"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="font-medium text-gray-700">Password</span>}
            rules={[
              { required: true, message: "Please create a password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Create a password"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label={
              <span className="font-medium text-gray-700">Date of Birth</span>
            }
            rules={[
              { required: true, message: "Please select your date of birth" },
            ]}
          >
            <DatePicker
              size="large"
              className="w-full h-12 rounded-xl"
              format="DD/MM/YYYY"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label={<span className="font-medium text-gray-700">Gender</span>}
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select
              size="large"
              placeholder="Select gender"
              className="rounded-xl"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
              <Option value="prefer-not-to-say">Prefer not to say</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="whatsappNumber"
            label={
              <span className="font-medium text-gray-700">WhatsApp Number</span>
            }
            rules={[
              { required: true, message: "Please enter your WhatsApp number" },
            ]}
          >
            <Input
              size="large"
              placeholder="+234 800 000 0000"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="telegramNumber"
            label={
              <span className="font-medium text-gray-700">Telegram Number</span>
            }
          >
            <Input
              size="large"
              placeholder="+234 800 000 0000"
              className="h-12 rounded-xl"
            />
            <Text type="secondary" className="text-xs">
              Optional
            </Text>
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

        {/* Footer */}
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
