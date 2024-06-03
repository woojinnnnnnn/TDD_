// 컨트롤러 로직
let users = [
  { id: 1, name: "Woojin" },
  { id: 2, name: "Jinwoo" },
  { id: 3, name: "Twich" },
];

const getUsers = function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
};

const getUser = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();

  res.json(user);
};

const destroyUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
};

const addUser = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isConflic = users.filter((user) => user.name === name).length;
  // 필터를 통해서 users 안에 있는 이름과 입력한 이름이 일치하는지 검사 만약 일치 한다면
  // 해당 리스폰스는 ({ id: 1, name: 'Woojin' }) 이런 새로운 배열을 응답 해줌.
  // 그러게 된다면 length 의 길이가 0 에서 -> 1 로 증가 함으로 해당 값이 중복 되었다 를 알 수 있음.
  if (isConflic) return res.status(409).end();

  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isExist = users.filter((user) => user.name === name).length;
  if (isExist) return res.status(409).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();

  user.name = name;
  res.json(user);
};

module.exports = {
  getUsers,
  getUser,
  destroyUser,
  addUser,
  updateUser,
};
