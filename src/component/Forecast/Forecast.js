import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
} from 'react-accessible-accordion';

function Forecast({ data }) {
  return (
    <div>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => {
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>Hello</AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>;
        })}
      </Accordion>
    </div>
  );
}

export default Forecast;
