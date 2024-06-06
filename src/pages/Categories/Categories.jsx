import { useEffect, useState } from "react";
import { getLocalStorage } from "../../Services/LocalStorage";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Box, Button, Group, Modal, Table, Text, Title } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export default function Categories() {
  const userToken = getLocalStorage("userToken");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToDeleteName, setCategoryToDeleteName] = useState("");

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
      close();
    } catch (err) {
      console.log(err);
    }
  }

  async function addCategory() {
    try {
      await axios.post(
        "http://localhost:3011/admin/addCategory",
        {
          category: category,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setCategory("");
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
        <img src={category.image} alt={category.name} />
      </Table.Td>
      <Table.Td>
        <img src={category.icon} alt={category.name} />
      </Table.Td>
      <Table.Td align="end">
        <Button
          color="red.9"
          leftSection={<IconTrash size={20} />}
          onClick={() => {
            setCategoryToDelete(category._id);
            setCategoryToDeleteName(category.name);
            open();
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
              style={{
                backgroundColor: "#15AABF",
              }}
              rightSection={<IconPlus size={20} />}
            >
              Add Category
            </Button>
          </Box>
          <Table
            styles={{
              thead: {
                color: "#15AABF",
              },
            }}
            className="fs-6"
            verticalSpacing="lg"
          >
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
        opened={opened}
        onClose={close}
        title={<Title order={3}>Delete Category</Title>}
        size="lg"
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
              close();
            }}
          >
            Cancel
          </Button>
          <Button color="red.8" onClick={deleteCategory}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}
