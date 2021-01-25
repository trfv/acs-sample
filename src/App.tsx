import { useEffect, useRef } from "react";
import "amazon-connect-streams";
import './App.css';

type Customer = Readonly<{
  id: number;
  name: string;
  furigana: string;
  phoneNumber: string;
}>;

const customers: Customer[] = [
  {
    id: 1,
    name: "本多直之",
    furigana: "ほんだなおゆき",
    phoneNumber: "+9026051259",
  },
  {
    id: 2,
    name: "植木博樹",
    furigana: "うえきひろき",
    phoneNumber: "+9028451368",
  },
  {
    id: 3,
    name: "堀井靖彦",
    furigana: "ほりいやすひこ",
    phoneNumber: "+9028561375",
  },
  {
    id: 4,
    name: "湯川佳孝",
    furigana: "ゆかわよしたか",
    phoneNumber: "+9029941473",
  },
  {
    id: 5,
    name: "水越裕史",
    furigana: "みずこしひろふみ",
    phoneNumber: "+9030541516",
  },
  {
    id: 6,
    name: "嶋幸久",
    furigana: "しまゆきひさ",
    phoneNumber: "+9030881525",
  },
  {
    id: 7,
    name: "西沢治郎",
    furigana: "にしざわじろう",
    phoneNumber: "+9031561571",
  },
  {
    id: 8,
    name: "柏崎聖二",
    furigana: "かしわざきせいじ",
    phoneNumber: "+9031861594",
  },
  {
    id: 9,
    name: "出井光",
    furigana: "でいひかり",
    phoneNumber: "+9033621731",
  },
  {
    id: 10,
    name: "吉積亮司",
    furigana: "よしづみりょうじ",
    phoneNumber: "+9034451802",
  },
  {
    id: 11,
    name: "下崎俊",
    furigana: "しもざきたかし",
    phoneNumber: "+9034601815",
  },
  {
    id: 12,
    name: "斯波正悟",
    furigana: "しばしょうご",
    phoneNumber: "+9034711823",
  },
  {
    id: 13,
    name: "豊浦幸輝",
    furigana: "とようらこうき",
    phoneNumber: "+9034881831",
  },
  {
    id: 14,
    name: "有地政男",
    furigana: "ありちまさお",
    phoneNumber: "+9034961839",
  },
  {
    id: 15,
    name: "塚脇岳人",
    furigana: "つかわきたけと",
    phoneNumber: "+9035201848",
  },
  {
    id: 16,
    name: "和多田瞭",
    furigana: "わただりょう",
    phoneNumber: "+9035491857",
  },
  {
    id: 17,
    name: "重藤堅一",
    furigana: "しげとうけんいち",
    phoneNumber: "+9035591857",
  },
  {
    id: 18,
    name: "曾我隼斗",
    furigana: "そがはやと",
    phoneNumber: "+9035761857",
  },
  {
    id: 19,
    name: "西川周三",
    furigana: "にしがわしゅうぞう",
    phoneNumber: "+9036061867",
  },
  {
    id: 20,
    name: "西銘琢朗",
    furigana: "にしめたくろう",
    phoneNumber: "+9036371889",
  },
  {
    id: 21,
    name: "竹ヶ原直純",
    furigana: "たけがはらなおずみ",
    phoneNumber: "+9036501902",
  },
  {
    id: 22,
    name: "歌代恵吾",
    furigana: "うたしろけいご",
    phoneNumber: "+9036721915",
  },
  {
    id: 23,
    name: "茶円惣一郎",
    furigana: "ちゃえんそういちろう",
    phoneNumber: "+9037341967",
  },
  {
    id: 24,
    name: "服田克",
    furigana: "はったかつみ",
    phoneNumber: "+9037561989",
  },
  {
    id: 25,
    name: "時廣利康",
    furigana: "ときひろとしやす",
    phoneNumber: "+9037611989",
  },
  {
    id: 26,
    name: "茶畑知憲",
    furigana: "ちゃばたとものり",
    phoneNumber: "+9037671989",
  },
  {
    id: 27,
    name: "石曽根昌嗣",
    furigana: "いしそねまさつぐ",
    phoneNumber: "+9037721989",
  },
  {
    id: 28,
    name: "呉島一慶",
    furigana: "くれしまかずよし",
    phoneNumber: "+9037971989",
  },
  {
    id: 29,
    name: "門上麟太郎",
    furigana: "かどかみりんたろう",
    phoneNumber: "+9038232015",
  },
  {
    id: 30,
    name: "倉屋敏康",
    furigana: "くらやとしやす",
    phoneNumber: "+9038382015",
  },
];

export const App = () => {
  const ccpContainerRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<connect.Agent | null>(null);

  useEffect(() => {
    if (!ccpContainerRef.current) {
      return;
    }
    // TODO set instanceName
    const ccpUrl = "https://{instanceName}.awsapps.com/connect/ccp-v2#/";
    connect.core.initCCP(ccpContainerRef.current, {
      ccpUrl,
      loginPopup: true,
      loginPopupAutoClose: true,
      loginOptions: {
        autoClose: true,
      },
      softphone: {
        allowFramedSoftphone: true,
        disableRingtone: true
      },
      // loginUrl: if you use IdP, please set this custome login url
    });

    connect.agent((agent: connect.Agent) => {
      agentRef.current = agent;
      const config = agent.getConfiguration();
      console.log("here is your configuration: " + JSON.stringify(config));
      const states = agent.getAgentStates();
      console.log("here are your states: " + JSON.stringify(states));
    });

  }, []);

  const handleButtonClick = (id: number) => {
    const agent = agentRef.current;
    if (agent) {
      const customer = customers.find(customer => customer.id === id)!;
      agent.connect(connect.Endpoint.byPhoneNumber(customer.phoneNumber), {});
    }
  };

  return (
    <main>
      <div className="main-area">
        <div className="ccp-container" ref={ccpContainerRef}/>
        <div className="content-container">
          <div className="customer-table">
            <div className="customer-table-header">
              <div>顧客名</div>
              <div>電話番号</div>
              <div></div>
            </div>
            <div className="customer-table-body">
              {customers.map(customer => (
                <div key={customer.id} className="customer-table-body-row">
                  <div><span>{customer.name}</span></div>
                  <div><span>{customer.phoneNumber}</span></div>
                  <div><button aria-label={`${customer.furigana}と通話する`} onClick={() => handleButtonClick(customer.id)}>通話する</button></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};

