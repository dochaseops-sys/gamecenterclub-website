import { useState } from "react"
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
} from "antd"
// import { CheckCircleTwoTone } from "@ant-design/icons"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

const { Title, Text } = Typography
const { Option } = Select

export function RegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    setLoading(true)
    console.log("Form submitted:", values)
    setTimeout(() => {
      message.success("Account created successfully!")
      setLoading(false)
      form.resetFields()
    }, 1200)
  }

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
            label={<span className="font-medium text-gray-700">WhatsApp Number</span>}
            rules={[{ required: true, message: "Please enter your WhatsApp number" }]}
          >
            <Input
              size="large"
              placeholder="+234 800 000 0000"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="telegramNumber"
            label={<span className="font-medium text-gray-700">Telegram Number</span>}
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
                  value ? Promise.resolve() : Promise.reject("You must agree to the terms"),
              },
            ]}
          >
            <Checkbox className="text-gray-700">
              I agree to the{" "}
              <Link to="/" className="underline text-blue-600 hover:text-blue-800">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/" className="underline text-blue-600 hover:text-blue-800">
                Privacy Policy
              </Link>
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

      {/* Benefits section */}
      {/* <div className="mt-10 w-full max-w-lg space-y-3 text-center">
        <BenefitItem text="Free to join, no credit card required" />
        <BenefitItem text="250 welcome bonus points" />
        <BenefitItem text="Start earning immediately" />
      </div> */}
    </div>
  )
}

// function BenefitItem({ text }: { text: string }) {
//   return (
//     <div className="flex items-center justify-center gap-3">
//       <CheckCircleTwoTone twoToneColor="#1677ff" className="text-xl" />
//       <Text type="secondary" className="text-sm">
//         {text}
//       </Text>
//     </div>
//   )
// }
