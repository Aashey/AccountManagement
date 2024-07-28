import { HiPlus } from "react-icons/hi2";
import {
  useDeleteLoanCategory,
  useGetLoanCategory,
} from "../services/useCategory";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  Typography,
  Skeleton,
  message,
} from "antd";
import { IoIosEye } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { CiExport } from "react-icons/ci";
import CategorySetupForm from "../../../components/category/categorySetupForm";
import { useState } from "react";

const LoanCategory = () => {
  const { data, error, isLoading, refetch } = useGetLoanCategory();
  const deleteLoanCategory = useDeleteLoanCategory();
  const [searchValue, setsearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value?.toLowerCase();
    if (!searchValue) {
      setFilteredData(null);
      return;
    }
    const filterData = data?.data?.data.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    setFilteredData(filterData);
  };

  const handleDelete = (record) => {
    const id = record.id;
    console.log(record.id);
    console.log(record.id);
    deleteLoanCategory.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Loan category deleted successfully! ");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete loan category.");
        },
      }
    );
  };

  const loanCategoryColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 200,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex justify-evenly">
          <Tooltip title="View">
            <Button
              type="none"
              className="bg-none text-gray-600 hover:text-green-600"
              icon={<IoIosEye size={22} />}
            ></Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="none"
              className="bg-none text-gray-600 hover:text-blue-600"
              icon={<BiSolidEdit size={22} />}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              onClick={() => handleDelete(record)}
              type="none"
              className="bg-none text-gray-600 hover:text-red-600"
              icon={<AiFillDelete size={22} />}
            ></Button>
          </Tooltip>
        </div>
      ),
      width: 250,
      align: "center",
    },
  ];

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <h2>Unable to get Loan Category</h2>;
  }

  return (
    <>
      <div className="bg-[#ededfa] text-white rounded-2xl shadow-sm p-4">
        <div className="flex justify-between align-center ">
          <span>
            <Typography.Title className="text-white" level={2}>
              Loan Category
            </Typography.Title>
            <Typography.Text>
              Manage all your loan categories or
              <Typography.Link> add a new category.</Typography.Link>
            </Typography.Text>
          </span>
          <Button className="bg-white p-5 mt-4" icon={<CiExport size={18} />}>
            Export
          </Button>
        </div>
      </div>
      <Space className="mt-5 mb-3 flex justify-between">
        <Button onClick={openDrawer} icon={<HiPlus size={20} />} type="primary">
          Add Loan Category
        </Button>
        <Input.Search
          onChange={handleSearch}
          placeholder="Search Income Categories"
        />
      </Space>
      <Table
        loading={isLoading}
        className="mt-5"
        rowKey="id"
        dataSource={filteredData ?? data?.data?.data}
        columns={loanCategoryColumn}
      />
      <CategorySetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type={"loan"}
        refetch={refetch}
      />
    </>
  );
};

export default LoanCategory;