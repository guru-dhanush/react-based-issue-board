interface IssueTagsProps {
  tags?: string[];
}

export const IssueTags = ({ tags }: IssueTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="issue-detail-tags">
      <h3>Tags</h3>
      <div className="tags-list">
        {tags.map((tag) => (
          <span key={tag} className="tag-item">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
