interface IssueDescriptionProps {
  description?: string;
}

export const IssueDescription = ({ description }: IssueDescriptionProps) => {
  if (!description) return null;

  return (
    <div className="issue-detail-description">
      <h3>Description</h3>
      <p>{description}</p>
    </div>
  );
};
