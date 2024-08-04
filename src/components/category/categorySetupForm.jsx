import { Button, Col, Drawer, Form, Input, message, Row } from "antd";
import { useEffect } from "react";

import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";
import { customMutation } from "../../services/customMutation";
import {
  useCreateIncomeCategory,
  useUpdateIncomeCategory,
} from "../../pages/category/services/income/useIncomeCategory";
import {
  useCreateExpenseCategory,
  useUpdateExpenseCategory,
} from "../../pages/category/services/expense/useExpenseCategory";
import {
  useCreateLoanCategory,
  useUpdateLoanCategory,
} from "../../pages/category/services/loan/useLoanCategory";

const CategorySetupForm = ({
  isDrawerOpen,
  onClose,
  type,
  refetch,
  mode,
  record = {},
}) => {
  console.log("Type", type);
  const [form] = Form.useForm();
  const createIncomeCategory = useCreateIncomeCategory();
  const createExpenseCategory = useCreateExpenseCategory();
  const createLoanCategory = useCreateLoanCategory();
  const updateIncomeCategory = useUpdateIncomeCategory();
  const updateExpenseCategory = useUpdateExpenseCategory();
  const updateLoanCategory = useUpdateLoanCategory();

  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    message.success(
      `${capitalizeInitialChar(type)} category ${action} successfully.`
    );
    onClose();
    refetch();
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} ${type} category.`);
  };

  const OnFinish = (values) => {
    const categoryMap = {
      income: {
        create: createIncomeCategory,
        update: updateIncomeCategory,
      },
      expense: {
        create: createExpenseCategory,
        update: updateExpenseCategory,
      },
      loan: {
        create: createLoanCategory,
        update: updateLoanCategory,
      },
    };

    const currentCategory = categoryMap[type][mode];

    const payload = mode === "create" ? values : { ...values, id: record.id };

    customMutation(
      currentCategory,
      payload,
      handleMutationSuccess,
      handleMutationError
    );
  };

  useEffect(() => {
    if ((mode == "update" || mode == "view") && record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [mode, record, form]);

  return (
    <>
      <Drawer
        title={`${capitalizeInitialChar(type)} Category`}
        width="40vw"
        open={isDrawerOpen}
        onClose={onClose}
      >
        <Form
          disabled={mode === "view"}
          layout="vertical"
          onFinish={OnFinish}
          form={form}
        >
          <div className="p-4">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input.TextArea
                rows={2}
                style={{ resize: "none" }}
                placeholder="Description"
              />
            </Form.Item>

            {mode !== "view" && (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default CategorySetupForm;
