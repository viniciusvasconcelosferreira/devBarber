import React, {useState, useEffect} from 'react';
import {
  Container,
  Scroller,
  FakeSwiper,
  SwiperItem,
  SwiperImage,
  SwiperDot,
  SwiperActiveDot,
  PageBody,
  UserInfoArea,
  ServiceArea,
  TestimonialArea,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,
  ServiceTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
} from './styles';
import Swiper from 'react-native-swiper';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../../services/Api';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NextPrevIcon from '../../assets/nav_next.svg';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      let res = await Api.getBarber(userInfo.id);
      if (res.error === '') {
        setUserInfo(res.data);
        setFavorited(res.data.favorited);
      } else {
        alert('Erro: ' + res.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavClick = () => {
    setFavorited(!favorited);
    Api.setFavorite(userInfo.id);
  };

  const handleServiceChoose = key => {
    setSelectService(key);
    setShowModal(true);
  };

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwiperDot />}
            activeDot={<SwiperActiveDot />}
            paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
            autoplay={true}>
            {userInfo.photos.map((item, key) => (
              <SwiperItem key={key}>
                <SwiperImage source={{uri: item.url}} resizeMode="cover" />
              </SwiperItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserFavButton onPress={handleFavClick}>
              {favorited ? (
                <FavoriteFullIcon height="24" width="24" fill="#ff0000" />
              ) : (
                <FavoriteIcon height="24" width="24" fill="#ff0000" />
              )}
            </UserFavButton>
          </UserInfoArea>
          {loading && <LoadingIcon size="large" color="#000" />}
          {userInfo.services && (
            <ServiceArea>
              <ServiceTitle>Lista de serviços</ServiceTitle>
              {userInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons={true}
                prevButton={<NavPrevIcon width="35" height="35" fill="#000" />}
                nextButton={
                  <NextPrevIcon width="35" height="35" fill="#000" />
                }>
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#fff" />
      </BackButton>
      <BarberModal show={showModal} setShow={setShowModal} user={userInfo} service={selectedService}/>
    </Container>
  );
};
