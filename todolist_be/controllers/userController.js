import userService from "../services/userService.js";

const listUser = async (req, res) => {
  let data = await userService.listUser();

  res.json({
    message: "success",
    data: data,
  });
};

const listUserById = async (req, res) => {
  let id = req.params.id;
  let data = await userService.listUserById(id);

  if (data == 0) {
    res.status(403).json({
      message: "error",
      data: data,
    });
  }

  res.json({
    message: "success",
    data: data,
  });
};

const createUser = async (req, res) => {
  let body = req.body;
  let data = await userService.createUser(body);
  res.json(data);
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let data = await userService.updateUser(id, body);
  res.json(data);
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  let data = await userService.deleteUser(id);
  res.json(data);
};

const login = async (req, res) => {
  let body = req.body;
  let data = await userService.login(body);
  if (data == null) {
    res
      .status(403)
      .json({ message: "Usuario o contraseña incorrecta", data: data });
  }
  res.json(data);
};

export default {
  listUser,
  listUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
