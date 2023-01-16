const multer = require("multer");
const User = require("./../models/user");
const JWT = require("jsonwebtoken");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    // user-idh34728-rh789075637.jpeg
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("File is not image!!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "sucess",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.error(err);
  }
  next();
};

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "sucess",
    data: {
      newUser,
    },
  });
  next();
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "sucess",
    data: {
      user,
    },
  });
  next();
};

exports.getMe = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id);
    currentUser.password = undefined;
    res.status(200).json({
      status: "sucess",
      data: {
        currentUser,
      },
    });
    next();
  } catch (err) {
    console.error(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const filteredBody = filterObj(req.body, "username", "email");
    if (req.file) filteredBody.photo = req.file.filename;
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        user: updateUser,
      },
    });
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      data: {
        message: err.message,
      },
    });
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: "Success",
    });
    next();
  } catch (err) {
    console.error(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "sucess",
    data: {
      user,
    },
  });
  next();
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "sucess",
    data: {
      message: "Users has been deleted!!",
    },
  });
  next();
};
