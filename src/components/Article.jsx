import FullPageScroller from './FullPageScroller';
import FemaleCounter from './FemaleCounter';
import DisasterLineGraph from './DisasterLineGraph';
import Choropleth from './Choropleth';
import Correlator from './Correlator';
import Highlight from './Highlight';
import Pie from './Pie';
import BarGraph from './BarGraph';
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LineGraphScroller from './LineGraph';

export default function Article() {
  return (
    <>
      <Container>
        <h2>Introduction</h2>
        In March 2023, we attended a Jane Street recruiting session for STEM focused Waterloo
        undergraduates. We noticed something subtle right as we entered the room: Jane Street
        recruiters signed us into the event, and they were all female. They were setting up the
        room, and organized the entire event which included food, puzzles, and social networking.
        Later on in the event, we had the opportunity to talk to full-time software engineers and
        quantitative traders who work at the company. But, in contrast to the group of women who
        greeted us at the entrance, this group of engineers was exclusively male. While this is just
        one personal anecdote, it aligns with an alarming reality of the one sided gender ratio in
        many STEM fields.
      </Container>
      <FullPageScroller Background={Pie}>
        <div>
          As a computer scientist, you're likely to notice an overwhelming majority of your
          colleagues are men.
        </div>
        <div>
          The 2022 <a href="https://survey.stackoverflow.co/2022">Stack Overflow survey</a> of over
          70,000 software developers found that globally{' '}
          <Highlight color="#ffc0cb">only 5.17% of respondents were women</Highlight>, an unnerving
          statistic for one of the most popular help sites for software engineering.
        </div>
        <div>
          In the United States, the software publishing industry as a whole has a slightly better
          ratio with <Highlight color="#ffc0cb">women making up 31%</Highlight> of the{' '}
          <a href="https://www.bls.gov/cps/cpsaat18.htm">workforce</a>.
        </div>
      </FullPageScroller>
      <FullPageScroller Background={FemaleCounter}>
        <div>
          We can also find this disparity in the education system. Let's consider a group of{' '}
          <Highlight color="#222222">100 post-secondary students</Highlight>.
        </div>
        <div>
          In 1970, <Highlight color="#ffc0cb">42 of them</Highlight> would have been women, on
          average.
        </div>
        <div>
          Today, women make up <Highlight color="#ffc0cb">over half</Highlight> of the students.
        </div>
        <div>
          However, if we consider only STEM classes, this{' '}
          <Highlight color="#ffc0cb">drops to 34%</Highlight>.
        </div>
        <div>
          Even worse, if this is a computer science class, we can expect as few as{' '}
          <Highlight color="#ffc0cb">20 women</Highlight>.
        </div>
      </FullPageScroller>
      <Container>
        <h2>The Gender Ratio Over Time</h2>
        Over the past decades, the ratio of women in STEM fields has changed. However, different
        countries are experiencing different trends. For example, some countries reported a majority
        of women in STEM classrooms around the 1990s. By the 2010s, some of these same countries
        reported an increase in male students entering the field, decreasing the ratio of women
        significantly. Continue scrolling.
      </Container>
      <DisasterLineGraph />
      <Choropleth />
      <Correlator />
      <LineGraphScroller />
      <Container>
        <h2>Why Girls Aren't Choosing Computer Science</h2>
        <p>
          During the 80s in the United States, personal computers became more common in homes. These
          computers were{' '}
          <OverlayTrigger placement="top" overlay={<Tooltip>( Henn, 2014)</Tooltip>}>
            <a href="https://www.npr.org/sections/money/2014/10/21/357629765/when-women-stopped-coding">
              marketed strongly towards men,
            </a>
          </OverlayTrigger>{' '}
          pushing forward new gender stereotypes.
        </p>
        <p>
          From a young age girls are influenced by these gender stereotypes that say computer
          science is more interesting for boys. The more an individual girl agrees with these
          stereotypes the smaller their own computer science interest is. Just seeing a label that
          says “girls are less interested in this activity than boys” is enough{' '}
          <OverlayTrigger placement="top" overlay={<Tooltip>(Master et al., 2021)</Tooltip>}>
            <a href="https://www.pnas.org/doi/10.1073/pnas.2100030118">
              to influence their interest
            </a>
          </OverlayTrigger>
          .
        </p>
        <p>
          Girls are also negatively influenced by gender stereotypes in the media they see in their
          environment. Removing stereotypical computer science items from a classroom made high
          school girls{' '}
          <OverlayTrigger placement="top" overlay={<Tooltip>(Master et al., 2015)</Tooltip>}>
            <a href="https://psycnet.apa.org/manuscript/2015-37516-001.pdf">
              significantly more likely
            </a>
          </OverlayTrigger>{' '}
          to be interested in taking a computer science course
        </p>
      </Container>
      <BarGraph />
      <Container>
        <h2>What Countries Are Doing Right</h2>
        <p>
          Countries such as{' '}
          <OverlayTrigger placement="top" overlay={<Tooltip> Mellström, 2009</Tooltip>}>
            <a href="https://journals.sagepub.com/doi/pdf/10.1177/0306312709334636?casa_token=sFcSiT0xG-UAAAAA:Qu7C7uUplADMEx0RbYIEZb0sGHayw4RZr33CaJQHafjduB5KnWgxKspCldwgb6bvoLaz7sMm2_be">
              Malaysia
            </a>
          </OverlayTrigger>
          {' and '}
          <OverlayTrigger placement="top" overlay={<Tooltip> Gharibyan & Gunsaulus, 2021</Tooltip>}>
            <a href="https://dl.acm.org/doi/10.1145/1140124.1140184">Armenia</a>
          </OverlayTrigger>{' '}
          have a much higher percentage of women in computer science. In these countries gender
          stereotypes are not a significant factor preventing women from enrolling in CS in
          university.
        </p>
        <p>
          Gender stereotypes in these countries may even be pushing women towards CS. In Malaysia,
          indoor computer science jobs are stereotypically seen as less masculine than outdoor jobs
          and thus better suited for females.
        </p>
        <p>
          Similarly, the Armenian study found that while only 52% of women think engineering is
          suitable for women, 79% of women thought CS was suitable.
        </p>
        <p>
          Female Malaysian students may also be positively influenced by a large number of female
          role models. In 2006, in the Faculty of CS & IT at the University of Malaya, the dean,
          three out four department heads, 61% of faculty lecturers, and 73% of the Ph.D. holders{' '}
          <OverlayTrigger placement="top" overlay={<Tooltip>Othman and Latih, 2009</Tooltip>}>
            <a href="https://www.cs.cmu.edu/~cfrieze/courses/malaysia.pdf">were women</a>
          </OverlayTrigger>
          .
        </p>
      </Container>

      <Container>
        <h2>So, What Can We Do About It?</h2>
        <div>
          <p>
            Studies show that spotlighting female role models, such as female engineers in
            recruiting sessions,{' '}
            <OverlayTrigger placement="top" overlay={<Tooltip>Cheryan et al., 2009</Tooltip>}>
              <a href="http://depts.washington.edu/sibl/Publications/Cheryan,%20Plaut,%20Davies,%20%26%20Steele%20(2009).pdf">
                increases the interest
              </a>
            </OverlayTrigger>{' '}
            and engagement of female attendants. This means that empowering women in universities,
            work places, recruiting sessions, and tech conferences is crucial in creating a space
            that is catered not only for men, but also women.
          </p>
          <p>
            Similarly, deconstructing our traditional image of computer scientists will also help.
            “Tech bro” culture &mdash; the competitive and exclusive work culture that &mdash; is
            prevalent attitudes in an industry largely catering to male interests,
            contributing to sexism and elitism in the tech space. The removal of established
            stereotypes and attitudes in CS should be followed with greater inclusion of different
            identities and interests to interest and engage members that do not fit into the
            stereotype.
          </p>
          <p>
            This argument also extends to the physical space in which we gather. In the previous
            section, we saw how the physical space can affect the interest of women towards CS;
            moving away from the stereotypical computer science classroom in both physical and
            social character to a more inclusive learning space can better serve our goals of
            equality.
          </p>
        </div>
      </Container>
    </>
  );
}
