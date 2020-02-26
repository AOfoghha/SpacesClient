import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Loader } from '../api';

export default class Mail extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      sid: null
    }
  }

  componentWillMount() {
    this.fetchMail();
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('sid');
      if (value !== null) {
        this.setState({ sid: value })
      }
    } catch (error) {
      alert(error);
    }
  }

  fetchMail = () => {
    AsyncStorage.getItem('sid').then((token) => {
      this.setState({
        loading: true
      });
      fetch('http://spcs.me/mail/', {
        method: 'POST',
        headers: {
          'X-Proxy': 'spaces',
          'Cookie': 'json=1; sid=' + token
        }
      })
        .then((response) => response.json())
        .then((data) => {
          //AsyncStorage.setState('messages', JSON.stringify(data));
          //console.log(JSON.stringify(data.form.contacts[0].name));
          //this.setState({ messages: JSON.stringify(data) })
          //console.log(data);
          //console.log(this.state.messages);
          this.setState({ loading: false });
        });
    })
  }

  render() {
    const list = [
      {
        "avatar": {
          "adult": "0",
          "downloadLink": "http://cs05.imagefiles.me/p/086189255206196165108165148044254147084191200000222016/1582025101/224433882/0/cc4a6c4f29d296e2cf015fb9531169e5/d95daa1655ecefbd5c34040675a18a58/0/AnomaIy/anomaly_nyV3.0-spcs.me.png",
          "extType": "7",
          "external_video": "0",
          "fileext": "png",
          "filename": "anomaly nyV3.0",
          "full_screen": null,
          "nid": "224433882",
          "partial": "0",
          "previewURL": "http://ts02.spac.me/tpic/3480196534/1582024500/cc4a6c4f29d296e2cf015fb9531169e5/224433882.p.41.40.0.350220440.jpg",
          "preview_alt": null,
          "ratio": "1",
          "resolution": "900x900",
          "show_cross_btn": null,
          "show_gif": "0",
          "show_name": "0",
          "size": {
            "height": "40",
            "strict": "1",
            "width": "41"
          },
          "text_is_meaningful": null,
          "type": "7"
        },
        "gender": "0",
        "human_mtime": "в 14:34",
        "id": "27192735:0",
        "in_cnt": "31",
        "last_message_id": "406051829",
        "last_message_widget": {
          "contact": {
            "can_write_error": null,
            "id": "27192735:0",
            "in_cnt": "31",
            "list": "0",
            "name": "AnomaIy",
            "new_cnt": "5",
            "nid": "27192735",
            "out_cnt": "206"
          },
          "date": "1582022061",
          "extended": "0",
          "for_external_use": "0",
          "hash": null,
          "human_date": "в 14:34",
          "nid": "406051829",
          "received": "1",
          "render_mode": "1",
          "render_modes": {
            "INLINE": "1",
            "LIST_ITEM": "2",
            "REPLY": "-1",
            "SHARE": "7"
          },
          "text": "sfe"
        },
        "list": "0",
        "lists": {
          "ARCHIVE": "3",
          "EMAILS": "5",
          "FAVOURITE": "1",
          "GARBAGE": "4",
          "INBOX": "0",
          "NEW": "6",
          "SPAM": "2"
        },
        "msg_list_link": "http://spcs.me/mail/message_list/?Contact=27192735&amp;Link_id=0&amp;List=0&amp;sid=5102161448851735",
        "mtime": "1582022061",
        "name": "AnomaIy",
        "new_cnt": "5",
        "nid": "27192735",
        "online_status": {
          "alt": "(OFF)",
          "id": "22003524",
          "is_online": "0",
          "last_time": "1582022989",
          "no_link": "1",
          "off_img": "man_off.gif",
          "on_img": "man_on.gif",
          "system": "0"
        },
        "out_cnt": "206",
        "render_modes": {
          "INLINE": "1",
          "LIST_ITEM": "2"
        },
        "text_addr": "AnomaIy",
        "user2_id": "22003524",
        "user_id": "22003524"
      },
      {
        "avatar": {
          "adult": "0",
          "downloadLink": "http://cs06.imagefiles.me/p/086189255206196165108165148044254147084191200000222016/1582025101/199395198/0/65fbe0105c37f622a20bf0598705b106/93c8e7b8a8a35a34e45f72ab89abae3d/0/molimawka/20180124_143023_65fbe0105c37f622a20bf0598705b106-spcs.me.png",
          "extType": "7",
          "external_video": "0",
          "fileext": "png",
          "filename": "20180124 143023 65fbe0105c37f622a20bf0598705b106",
          "full_screen": null,
          "nid": "199395198",
          "partial": "0",
          "previewURL": "http://ts01.spac.me/tpic/374862035/1582024500/65fbe0105c37f622a20bf0598705b106/199395198.p.41.40.0.jpg",
          "preview_alt": null,
          "ratio": "1.77777777777778",
          "resolution": "1920x1080",
          "show_cross_btn": null,
          "show_gif": "0",
          "show_name": "0",
          "size": {
            "height": "40",
            "strict": "1",
            "width": "41"
          },
          "text_is_meaningful": null,
          "type": "7"
        },
        "gender": "-1",
        "id": "26719677:0",
        "in_cnt": "46",
        "last_message_id": "402634662",
        "last_message_widget": {
          "contact": {
            "can_write_error": null,
            "id": "26719677:0",
            "in_cnt": "46",
            "list": "0",
            "name": "molimawka",
            "new_cnt": "0",
            "nid": "26719677",
            "out_cnt": "257"
          },
          "date": "1575672828",
          "extended": "0",
          "for_external_use": "0",
          "hash": null,
          "human_date": "7 дек 2019",
          "nid": "402634662",
          "not_read": "1",
          "render_mode": "1",
          "render_modes": {
            "INLINE": "1",
            "LIST_ITEM": "2",
            "REPLY": "-1",
            "SHARE": "7"
          },
          "text": "567567567"
        },
        "list": "0",
        "lists": {
          "ARCHIVE": "3",
          "EMAILS": "5",
          "FAVOURITE": "1",
          "GARBAGE": "4",
          "INBOX": "0",
          "NEW": "6",
          "SPAM": "2"
        },
        "msg_list_link": "http://spcs.me/mail/message_list/?Contact=26719677&amp;Link_id=0&amp;List=0&amp;sid=5102161448851735",
        "mtime": "1575672828",
        "name": "molimawka",
        "new_cnt": "0",
        "nid": "26719677",
        "online_status": {
          "alt": "(OFF)",
          "id": "53342830",
          "is_online": "0",
          "last_time": "1579019597",
          "no_link": "1",
          "off_img": "man_off.gif",
          "on_img": "man_on.gif",
          "system": "0"
        },
        "out_cnt": "257",
        "render_modes": {
          "INLINE": "1",
          "LIST_ITEM": "2"
        },
        "text_addr": "molimawka",
        "user2_id": "53342830",
        "user_id": "53342830"
      },
      {
        "avatar": {
          "adult": "0",
          "downloadLink": "http://cs00.userfiles.me/f/086189255206196165108165148044254147084191200000222016/1582025101/74757437/0/ab66460d7a40745cbd1ae56d3a942565/user-spcs.me.png",
          "extType": "7",
          "external_video": "0",
          "fileext": "png",
          "filename": "user",
          "full_screen": null,
          "nid": "74757437",
          "partial": "0",
          "previewURL": "http://ts02.spac.me/tfil/2867418437/1582024500/ab66460d7a40745cbd1ae56d3a942565/74757437.f.41.40.0.jpg",
          "preview_alt": null,
          "ratio": "1",
          "resolution": "100x100",
          "show_cross_btn": null,
          "show_gif": "0",
          "show_name": "0",
          "size": {
            "height": "40",
            "strict": "1",
            "width": "41"
          },
          "text_is_meaningful": null,
          "type": "5"
        },
        "gender": "-1",
        "human_mtime": "27 мар 2018",
        "id": "26585308:0",
        "in_cnt": "1",
        "last_message_id": "362445811",
        "last_message_widget": {
          "contact": {
            "can_write_error": null,
            "id": "26585308:0",
            "in_cnt": "1",
            "list": "0",
            "name": "Система",
            "new_cnt": "0",
            "nid": "26585308",
            "out_cnt": "0",
            "system": "1"
          },
          "date": "1522156574",
          "extended": "0",
          "for_external_use": "0",
          "hash": null,
          "human_date": "27 мар 2018",
          "nid": "362445811",
          "received": "1",
          "render_mode": "1",
          "render_modes": {
            "INLINE": "1",
            "LIST_ITEM": "2",
            "REPLY": "-1",
            "SHARE": "7"
          },
          "text": "Приветствуем вас, id96605086! \t\t\tДобро пожаловать на Spaces.ru - приватную мобильную социальную...",
          "there_is_more": "сеть нового поколения! \t\t\tТеперь у вас есть собственный сайт в сети по адресу <u>id96605086.spaces.ru</u>..."
        },
        "list": "0",
        "lists": {
          "ARCHIVE": "3",
          "EMAILS": "5",
          "FAVOURITE": "1",
          "GARBAGE": "4",
          "INBOX": "0",
          "NEW": "6",
          "SPAM": "2"
        },
        "msg_list_link": "http://spcs.me/mail/message_list/?Contact=26585308&amp;Link_id=0&amp;List=0&amp;sid=5102161448851735",
        "mtime": "1522156574",
        "name": "Система",
        "new_cnt": "0",
        "nid": "26585308",
        "online_status": {
          "alt": "(OFF)",
          "id": "4839",
          "is_online": "0",
          "last_time": "1255560393",
          "no_link": "1",
          "off_img": "man_off.gif",
          "on_img": "man_on.gif",
          "system": "1"
        },
        "out_cnt": "0",
        "render_modes": {
          "INLINE": "1",
          "LIST_ITEM": "2"
        },
        "system": "1",
        "text_addr": "Система",
        "user2_id": "4839",
        "user_id": "4839"
      }
    ]

    return (
      <View>
        <Loader
          loading={this.state.loading} />
        {
          list.map((contacts, i) => (
            <TouchableOpacity>
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: contacts.avatar.previewURL } }}
                title={contacts.name}
                subtitle={contacts.last_message_widget.text}
                badge={{ value: 13, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                bottomDivider
              />
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#ffffff',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });