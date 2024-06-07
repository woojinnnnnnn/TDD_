// 컨트롤러 로직
const models = require("../../models.js");

const getUsers = function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  models.User.findAll({
    limit: limit,
  }).then((users) => {
    res.json(users);
  });
};

const getUser = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  models.User.findOne({
    where: {
      id,
    },
  }).then((user) => {
    if (!user) return res.status(404).end();
    res.json(user);
  });
};

const destroyUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  models.User.destroy({
    where: { id },
  }).then(() => {
    res.status(204).end();
  });
};

const addUser = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  models.User.create({ name })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).end();
      }
      res.status(500).end();
    });
  // const isConflic = users.filter((user) => user.name === name).length;
  // // 필터를 통해서 users 안에 있는 이름과 입력한 이름이 일치하는지 검사 만약 일치 한다면
  // // 해당 리스폰스는 ({ id: 1, name: 'Woojin' }) 이런 새로운 배열을 응답 해줌.
  // // 그러게 된다면 length 의 길이가 0 에서 -> 1 로 증가 함으로 해당 값이 중복 되었다 를 알 수 있음.
  // if (isConflic) return res.status(409).end();
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  models.User.findOne({ where: { id } }).then((user) => {
    if (!user) return res.status(404).end();
    user.name = name;
    user
      .save()
      .then(_ => {
        res.json(user);
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(409).end();
        }
        res.status(500).end();
      });
  });
};

module.exports = {
  getUsers,
  getUser,
  destroyUser,
  addUser,
  updateUser,
};
