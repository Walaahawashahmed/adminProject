import { useEffect, useState } from "react";
import { getLocalStorage } from "../../Services/LocalStorage";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Box,
  Button,
  FileInput,
  Group,
  Modal,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconPhoto,
  IconPlus,
  IconTrash,
  IconWriting,
} from "@tabler/icons-react";

export default function Categories() {
  const userToken = getLocalStorage("userToken");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [
    isDeleteModalOpen,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [
    isAddCategoryModalOpen,
    { open: openAddCategoryModal, close: closeAddCategoryModal },
  ] = useDisclosure(false);
  const addCategoryForm = useForm({
    initialValues: {
      category: "",
      image: "",
      icon: "",
    },
  });
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToDeleteName, setCategoryToDeleteName] = useState("");
  const [imageToPreview, setImageToPreview] = useState(null);
  const [isImageModalOpen, { open: openImageModal, close: closeImageModal }] =
    useDisclosure(false);

  async function getCategories() {
    try {
      const response = await axios.get(
        "http://localhost:3011/admin/listCategories",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setData(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCategory() {
    try {
      await axios.delete(
        `http://localhost:3011/admin/deleteCategory/${categoryToDelete}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      getCategories();
      setCategoryToDelete(null);
      setCategoryToDeleteName("");
      closeDeleteModal();
    } catch (err) {
      console.log(err);
    }
  }

  async function addCategory() {
    try {
      const res = await axios.post(
        "http://localhost:3011/admin/addCategory",
        {
          category: addCategoryForm.values.category,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      const categoryId = res.data.category._id;

      const categoryImage = new FormData();
      categoryImage.append("image", addCategoryForm.values.image);

      const categoryIcon = new FormData();
      categoryIcon.append("icon", addCategoryForm.values.icon);

      try {
        await axios.post(
          `http://localhost:3011/admin/uploadCategoryImage/${categoryId}`,
          categoryImage,
          {
            headers: { Authorization: `Bearer ${userToken}` },
            "Content-Type": "multipart/form-data",
          }
        );
        await axios.post(
          `http://localhost:3011/admin/uploadIconImage/${categoryId}`,
          categoryIcon,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
      closeAddCategoryModal();
      addCategoryForm.reset();
      getCategories();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const rows = data.map((category) => (
    <Table.Tr key={category._id}>
      <Table.Td>{category.name}</Table.Td>
      <Table.Td>
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={`http://localhost:3011/${category.image}`}
          alt={category.name + " Image"}
          onClick={() => {
            setImageToPreview(`http://localhost:3011/${category.image}`);
            openImageModal();
          }}
        />
      </Table.Td>
      <Table.Td>
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={`http://localhost:3011/${category.icon}`}
          alt={category.name + " Icon"}
          onClick={() => {
            setImageToPreview(`http://localhost:3011/${category.icon}`);
            openImageModal();
          }}
        />
      </Table.Td>
      <Table.Td align="end">
        <Button
          color="red.9"
          leftSection={<IconTrash size={20} />}
          onClick={() => {
            setCategoryToDelete(category._id);
            setCategoryToDeleteName(category.name);
            openDeleteModal();
          }}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Box
        style={{
          backgroundColor: "#ffffff15",
          borderRadius: 15,
          padding: "20px",
          width: "100%",
        }}
      >
        <Box>
          <Title order={1} className="fw-bolder text-white text-center my-5">
            Categories
          </Title>
          <Box className="w-100 d-flex justify-content-end mb-3">
            <Button
              color="cyan"
              rightSection={<IconPlus size={20} />}
              onClick={openAddCategoryModal}
            >
              Add Category
            </Button>
          </Box>
          <Table className="fs-6" verticalSpacing="lg" borderColor="gray">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category Name</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Icon</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>
      </Box>

      <Modal
        opened={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title={<Title order={3}>Delete Category</Title>}
        size="lg"
        transitionProps={{
          duration: 100,
        }}
      >
        <Text className="pt-2 pb-4">
          Are you sure you want to delete <b>{categoryToDeleteName}</b>?
        </Text>
        <Group justify="end">
          <Button
            color="gray"
            onClick={() => {
              setCategoryToDelete(null);
              setCategoryToDeleteName("");
              closeDeleteModal();
            }}
          >
            Cancel
          </Button>
          <Button color="red.8" onClick={deleteCategory}>
            Delete
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isAddCategoryModalOpen}
        onClose={closeAddCategoryModal}
        title={<Title order={3}>Add Category</Title>}
        size="lg"
        transitionProps={{
          duration: 100,
        }}
      >
        <form
          className="d-flex flex-column gap-3"
          onSubmit={addCategoryForm.onSubmit(addCategory)}
        >
          <TextInput
            label="Enter Category Name: "
            required
            withAsterisk
            {...addCategoryForm.getInputProps("category")}
          />
          <Group grow>
            <FileInput
              label="Category Image"
              placeholder="Attach Image"
              rightSection={<IconPhoto />}
              {...addCategoryForm.getInputProps("image")}
            />
            <FileInput
              label="Category Icon"
              placeholder="Attach Icon"
              rightSection={<IconWriting />}
              {...addCategoryForm.getInputProps("icon")}
            />
          </Group>
          <Box className="w-100 d-flex justify-content-end">
            <Button type="submit" color="cyan">
              Add Category
            </Button>
          </Box>
        </form>
      </Modal>

      <Modal
        opened={isImageModalOpen}
        onClose={closeImageModal}
        size="lg"
        transitionProps={{
          duration: 100,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src={imageToPreview}
          alt="Category"
        />
      </Modal>
    </>
  );
}
