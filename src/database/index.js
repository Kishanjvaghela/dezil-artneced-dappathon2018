const loginUser = userId => {
  localStorage.setItem('user', userId);
};

const getUser = () => {
  localStorage.getItem('user');
};

const createTender = (tenderId, tender) => {
  const valueJSON = localStorage.getItem('tenders');
  try {
    let value = {};
    if (valueJSON) {
      value = JSON.parse(valueJSON);
    }
    value[tenderId] = tender;
    localStorage.setItem('tenders', JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const getTenders = () => {
  const valueJSON = localStorage.getItem('tenders');
  console.log(valueJSON);
  let value = {};
  try {
    value = JSON.parse(valueJSON);
  } catch (e) {
    console.log(e);
  }
  return value;
};

export default { createTender, getTenders, getUser, loginUser };
