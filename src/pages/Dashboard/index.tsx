/* eslint-disable camelcase */
import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import nullAvatarImg from '../../assets/nullAvatarImg.png';

//import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  KnowledgeList,
  KnowledgeListTitle,
  KnowledgeContainer,
  KnowledgeInfo,
  KnowledgeName,
  KnowledgeMeta,
  KnowledgeMetaText,
} from './styles';

/* export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
} */

export interface Knowledge {
  id: string;
  title: string;
  paragraphs: string[];
}

const Dashboard: React.FC = () => {
  const knowledgeData = [{
    id:"123",
    title: "Hello",
    paragraphs: ["Hi! I am a blank dashboard!", "Here you can do all the things that you want!", "Just do it!"],
  }]
  /* const [providers, setProviders] = useState<Provider[]>([]); */
  const [knowledges, setKnowledges] = useState<Knowledge>(knowledgeData);


  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

/*   useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []); */

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateBack = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>
          Bem vindo, {'\n'}
          {user.name && <UserName>{user.name}</UserName>}
          {!user.name && <UserName>NullUser</UserName>}
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          {user.avatar_url && <UserAvatar source={{ uri: user.avatar_url }} />}
          {!user.avatar_url && <UserAvatar source={nullAvatarImg} />}
        </ProfileButton>
      </Header>


       <KnowledgeList
        data={knowledges}
        keyExtractor={knowledge=>knowledge.id}
        ListHeaderComponent={
          <KnowledgeListTitle>Saber diário</KnowledgeListTitle>
        }
        renderItem={({ item: knowledge }) => (
          <KnowledgeContainer>
            <KnowledgeInfo>
              <KnowledgeName>{knowledge.title}</KnowledgeName>

              <KnowledgeMeta>
                {knowledge.paragraphs.length!=0 &&
                  knowledge.paragraphs.map((p)=>{
                    <KnowledgeMetaText>{p}</KnowledgeMetaText>
                  })
                }
              </KnowledgeMeta>
            </KnowledgeInfo>
          </KnowledgeContainer>
        )}
      />

    </Container>
  );
};

export default Dashboard;
