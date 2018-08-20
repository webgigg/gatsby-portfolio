import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { theme, mixins, Section, H3, P, Ul, Img } from '../style';

const AboutContainer = Section.extend``;
const FlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;
const Content = styled.div`
  max-width: 480px;
  width: 50%;
`;
const SkillsContainer = Ul.extend`
  display: grid;
  grid-template-columns: 200px 200px;
  margin-top: 20px;
`;
const Skill = styled.li`
  position: relative;
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.smallish};
  margin-bottom: 10px;

  &:before {
    content: '>';
    margin-right: 10px;
    color: ${theme.colors.green};
  }
`;
const ProfPic = Img.extend`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
`;
const PicContainer = styled.div`
  max-width: 300px;
  border-radius: ${theme.borderRadius};
  background-color: ${theme.colors.green};
  position: relative;

  &:hover {
    &:after {
      top: 15px;
      left: 15px;
    }

    ${ProfPic} {
      filter: none;
      mix-blend-mode: normal;
    }
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: ${theme.transition};
    background-color: ${theme.colors.navy};
    mix-blend-mode: screen;
    border-radius: ${theme.borderRadius};
  }

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid ${theme.colors.green};
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: -1;
    transition: ${theme.transition};
    border-radius: ${theme.borderRadius};
  }
`;

class About extends Component {
  static propTypes = {
    about: PropTypes.array.isRequired,
  };

  render() {
    const { about } = this.props;
    const { node } = about[0];

    return (
      <AboutContainer id="about">
        <H3>{node.frontmatter.title}</H3>
        <FlexContainer>
          <Content>
            <P dangerouslySetInnerHTML={{ __html: node.html }} />
            <SkillsContainer>
              {node.frontmatter.skills &&
                node.frontmatter.skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
            </SkillsContainer>
          </Content>
          <PicContainer>
            <ProfPic src={node.frontmatter.image} alt="Profile Picture" />
          </PicContainer>
        </FlexContainer>
      </AboutContainer>
    );
  }
}

export default About;
