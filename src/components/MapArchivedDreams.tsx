import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllDreamsByUser } from "../api/api";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ButtonDiv, StyledDiv, StyledIconButton } from "../styles/styles";

interface IDream {
  dreamId: string;
  title: string;
  content: string;
  category: string;
  type: string;
}

export function MapDreams() {
  const { token, userId } = useContext(AuthContext);
  const [dreams, setDreams] = useState<IDream[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPreviousDreams = async () => {
      try {
        const response = await getAllDreamsByUser(userId, token);

        if (response?.status == 200) return response.data;
        else return [];
      } catch (error) {
        console.error(error);
      }
    };

    getPreviousDreams().then((data) => setDreams(data));
  }, [token, userId]);

  return (
    <>
      {/*  TODO move styles to styles file */}

      {dreams.map((dream, index) => (
        <StyledDiv key={index}>
          <h1>{dream.title}</h1>
          <p>{dream.content}</p>
          <p>
            <span style={{ fontStyle: "", color: "#FFBA86" }}>
              {dream.category.toUpperCase()}
            </span>
            {dream.type == "NIGHTMARE" ? (
              <span>
                {" "}
                •{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: "",
                    color: "#79155B",
                  }}
                >
                  {dream.type}
                </span>
              </span>
            ) : null}
          </p>
          <ButtonDiv>
            <StyledIconButton
              aria-label="Press to edit dream"
              onClick={() => navigate("/updatedream", { state: { dream } })}
            >
              <FaPencilAlt />
            </StyledIconButton>

            <StyledIconButton
              aria-label="Press to delete dream"
              onClick={() => console.log("Deleted.. but not really")}
            >
              <FaRegTrashCan />
            </StyledIconButton>
          </ButtonDiv>
        </StyledDiv>
      ))}
    </>
  );
}
