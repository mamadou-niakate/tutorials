import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  width: 90%;
  padding: auto;
  margin: auto;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const AddTasksListButton = styled.button`
  width: 90%;
  height: 2rem;
  border: none;
  border-bottom: 5px solid #f0f8ff;
  background-color: transparent;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
  text-align: left;
  margin: 2.5rem 0;
  padding-bottom: 3rem;
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  max-height: 85vh;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 0.5rem;
    width: 0.5rem;
    background-color: #efefef;
    border-radius: 0.5rem;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f8ff;
  width: 260px;
  min-width: 260px;
  min-height: 77vh;
  overflow-y: auto;
  margin: 0 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  & > div > p {
    margin: 0 0.5rem;
  }
`;

export const TasksListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const TasksListActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
`;

export const SvgIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const TasksListTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TasksListTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TasksListCount = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  padding: 0.1rem 0.5rem;
  background-color: #ffffff;
`;

export const AddTaskButton = styled.button`
  width: 100%;
  height: 3rem;
  padding: 1rem 0;
  border-radius: 0.5rem;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    background-color: #ffffff;
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TaskActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  padding: 0 1rem;
`;

export const TaskEditButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const TaskDeleteButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const PriorityBar = styled.div`
  width: 50px;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => {
    switch (props.priority.toLowerCase()) {
      case "high":
        return "#ff0000";
      case "medium":
        return "#F6CD82";
      case "low":
        return "#00ff00";
      default:
        return "#ffffff";
    }
  }};
`;

export const CustomTasksListForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin-bottom: 1rem;
`;

export const CustomTasksListFormInput = styled.input`
  width: 30%;
  height: 0.5rem;
  border: none;
  border: 5px solid #f0f8ff;
  border-radius: 0.5rem;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1rem;
  padding: 1rem;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CustomTasksListFormButton = styled.button`
  width: 5rem;
  height: 2rem;
  border: none;
  background-color: #f0f8ff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.5rem;
`;

export const CustomTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 84%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  & > * {
    margin-bottom: 1rem;
  }
`;

export const CustomTaskFormInput = styled.input`
  width: 85%;
  height: 0.5rem;
  border: none;
  border: 2px solid #f0f8ff;
  border-radius: 0.5rem;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;

export const DatePickersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CustomTaskFormSelect = styled.select`
  width: 100%;
  height: 2.5rem;
  border: none;
  border: 2px solid #f0f8ff;
  border-radius: 0.5rem;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 1rem;
  &:focus {
    outline: none;
  }
  option {
    font-size: 1rem;
    font-weight: 700;
    color: #000000;
  }
`;

export const CustomTaskFormActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CustomTaskFormButton = styled.button`
  min-width: 5rem;
  height: 2rem;
  border: none;
  margin: 0 1rem;
  background-color: ${({ cancel }) => (cancel ? "#ff0000" : "#00ff00")};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.5rem;
`;
