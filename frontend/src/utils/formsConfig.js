export const inputProfilePopup = [
  {
    className: 'popup__input popup__input_type_name',
    type: 'text',
    placeholder: 'Имя',
    name: 'profileName',
    minLength: '2',
    maxLength: '40',
    required: true,
  },
  {
    className: 'popup__input popup__input_type_job',
    type: 'text',
    placeholder: 'О себе',
    name: 'profileJob',
    minLength: '2',
    maxLength: '200',
    required: true,
  }
]

export const inputAvatarPopup = [
  {
    className: 'popup__input popup__input_type_link',
    type: 'url',
    name: 'profileAvatar',
    placeholder: 'Ссылка на аватар',
    required: true,
  }]

export const inputPlacePopup = [
  {
    className: 'popup__input popup__input_type_name',
    type: 'text',
    placeholder: 'Название',
    name: 'placeName',
    minLength: '2',
    maxLength: '30',
    required: true,
  },
  {
    className: 'popup__input popup__input_type_link',
    type: 'url',
    placeholder: 'Ссылка на картинку',
    name: 'placeImage',
    required: true,
  }
]