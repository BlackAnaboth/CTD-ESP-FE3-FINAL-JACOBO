import { faqsData } from "dh-marvel/components/faqs/faqsData"
import { Accordion, AccordionSummary, Typography, AccordionDetails, Container  } from "@mui/material";

export default function Faq() {
    return(
        <Container>
            <h1>Preguntas Frecuentes</h1>
            {
                faqsData.map((faq, key) => {
                    return (
                        <Accordion key = {key}>
                            <AccordionSummary id="panel1a-header">
                                <Typography sx={{fontWeight: "bold"}}>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography> {faq.answer} </Typography>
                            </AccordionDetails>
                        </Accordion >
                    )
                })
            }
        </Container>
    )
}

