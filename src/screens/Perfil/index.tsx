import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon, LockIcon } from "@chakra-ui/icons";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";

export function Perfil() {
  const { user } = useUser();
  const [userData, setUserData] = useState(user || null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    user
      ? {
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        }
      : {}
  );
  // const [imageFile, setImageFile] = useState(null);
  const [imagePreview
    // , setImagePreview
  ] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          navigate("/login");
          return;
        }
        setUserData(user);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        toast({
          title: "Erro",
          description: "Falha ao carregar dados do usuário",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }

      //   try {
      //     const user = auth.currentUser;
      //     if (!user) {
      //       navigate('/login');
      //       return;
      //     }

      //     const userDoc = await getDoc(doc(db, 'users', user.uid));
      //     if (userDoc.exists()) {
      //       const data = userDoc.data();
      //       setUserData(data);
      //       setFormData({
      //         name: data.name || '',
      //         email: data.email || '',
      //         phone: data.phone || '',
      //         status: data.status || 'Ativo',
      //         escritorio: data.escritorio ? data.escritorio.join(', ') : ''
      //       });
      //       setImagePreview(data.image || '');
      //     }
      //   } catch (error) {
      //     toast({
      //       title: 'Erro',
      //       description: 'Falha ao carregar dados do usuário',
      //       status: 'error',
      //       duration: 5000,
      //       isClosable: true,
      //     });
      //   } finally {
      //     setLoading(false);
      //   }
    };

    fetchUserData();
  }, [navigate, toast]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Image change event:", e);
    // const file = e.target.files && e.target.files[0];
    // if (file) {
    //   setImageFile(file);
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImagePreview(reader.result as string);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleSave = async () => {
    // try {
    //   const user = auth.currentUser;
    //   if (!user) {
    //     navigate('/login');
    //     return;
    //   }
    //   let imageUrl = imagePreview;
    //   if (imageFile) {
    //     const storageRef = ref(storage, `profile-images/${user.uid}`);
    //     await uploadBytes(storageRef, imageFile);
    //     imageUrl = await getDownloadURL(storageRef);
    //   }
    //   const updateData = {
    //     ...formData,
    //     escritorio: formData.escritorio.split(',').map(item => item.trim()),
    //     ...(imageUrl && { image: imageUrl })
    //   };
    //   await updateDoc(doc(db, 'users', user.uid), updateData);
    //   setUserData(prev => ({ ...prev, ...updateData }));
    //   setIsEditing(false);
    //   toast({
    //     title: 'Sucesso',
    //     description: 'Perfil atualizado com sucesso!',
    //     status: 'success',
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // } catch (error) {
    //   toast({
    //     title: 'Erro',
    //     description: 'Falha ao atualizar perfil',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
  };

  const handleLogout = async () => {
    // try {
    //   useContext(auth);
    //   navigate('/login');
    // } catch (error) {
    //   toast({
    //     title: 'Erro',
    //     description: 'Falha ao fazer logout',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Carregando...</Text>
      </Flex>
    );
  }

  if (!userData) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Nenhum dado de usuário encontrado</Text>
      </Flex>
    );
  }

  return (
    <>
      <main className="body_colaborators">
        <Menu type={user?.usertype == "admin" ? "admin" : "colaborator"} />
        <div className="linha"></div>
        <div className="divMenus"></div>

        <div className="mainCalculator">
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={8}
            h={"100%"}
            w={"100%"}
          >
            {/* Sidebar */}
            <Box
              w={{ base: "100%", md: "300px" }}
              bg="gray.50"
              p={6}
              borderRadius="lg"
              boxShadow="md"
            >
              <Flex direction="column" align="center">
                <Avatar
                  size="2xl"
                  name={userData.name}
                  src={imagePreview}
                  mb={4}
                />
                <Heading size="md" mb={2}>
                  {userData.name}
                </Heading>
                <Text fontSize="medium" color="gray.500" mb={4}>
                  {userData.email}
                </Text>

                <Box w="full" mb={6}>
                  <Text fontWeight="bold" fontSize={1} mb={2}>
                    Tipo de Usuário
                  </Text>
                  <Text fontSize={1}>
                    {userData.usertype === "admin" && "Administrador"}
                    {userData.usertype === "enterprise" && "Empresa Parceira"}
                    {userData.usertype === "member" && "Vendedor"}
                  </Text>
                </Box>

                <Button
                  colorScheme={isEditing ? "red" : "blue"}
                  leftIcon={isEditing ? <CloseIcon /> : <EditIcon />}
                  onClick={() => setIsEditing(!isEditing)}
                  w="full"
                  mb={4}
                >
                  {isEditing ? "Cancelar" : "Editar Perfil"}
                </Button>

                <Button
                  colorScheme="red"
                  leftIcon={<LockIcon />}
                  onClick={onOpen}
                  w="full"
                >
                  Sair
                </Button>
              </Flex>
            </Box>

            {/* Main Content */}
            <Box flex={1} bg="white" p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={6}>
                Informações do Perfil
              </Heading>

              {isEditing ? (
                <Stack spacing={6}>
                  <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isDisabled
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  {/* {(userData.usertype === 'member' || userData.usertype === 'admin') && (
                <FormControl>
                  <FormLabel>Escritório(s)</FormLabel>
                  <Input
                    name="escritorio"
                    value={formData.escritorio}
                    onChange={handleInputChange}
                    placeholder="Separe por vírgulas"
                  />
                </FormControl>
              )} */}

                  <FormControl>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      pt={1}
                    />
                  </FormControl>

                  <Flex justify="flex-end" gap={4}>
                    <Button onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button colorScheme="blue" onClick={handleSave}>
                      Salvar Alterações
                    </Button>
                  </Flex>
                </Stack>
              ) : (
                <Stack spacing={6}>
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      Nome
                    </Text>
                    <Text>{userData.name}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      Email
                    </Text>
                    <Text>{userData.email}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      Telefone
                    </Text>
                    <Text>{userData.phone || "Não informado"}</Text>
                  </Box>
                  {/*               
              {(userData.usertype === 'member' || userData.usertype === 'admin') && (
                <Box>
                  <Text fontWeight="bold" mb={1}>Escritório(s)</Text>
                  <Text>
                    {userData.escritorio ? userData.escritorio.join(', ') : 'Não informado'}
                  </Text>
                </Box>
              )} */}
                </Stack>
              )}
            </Box>
          </Flex>

          {/* Logout Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmar Logout</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Tem certeza que deseja sair da aplicação?</Text>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={handleLogout}>
                  Sair
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </main>
    </>
  );
}
