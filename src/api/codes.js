const Codes = (code) => {
  switch (code) {
    case "00000":
      return code + ': Успех'
      break;
    case "00001":
      return code + ': Капча'
      break;
    case "00002":
      return code + ': Ошибка'
      break;
    case "01001":
      return code + ': Успешно вышли или еще не авторизированы'
      break;
    case "01003":
      return code + ': Капча верна'
      break;
    case "01007":
      return code + ': Уже авторизированы'
      break;
    default:
      return code + ': Хз шо за поебота'
      break;
  }
}

export { Codes };