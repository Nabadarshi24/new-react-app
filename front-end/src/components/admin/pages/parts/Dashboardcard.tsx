import { Link } from 'react-router';

type TypeProps = {
  cardTitle: string;
  cardValue: number | string;
  cardLink?: string;
  cardLinkText?: string;
};

const Dashboardcard = ({
  cardTitle,
  cardValue,
  cardLink,
  cardLinkText
}: TypeProps) => {
  return (
    <div className="tw:rounded-lg tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:shadow-sm">
      <p className="tw:text-sm tw:font-medium tw:text-slate-500">{cardTitle}</p>
      <p className="tw:mt-1 tw:text-2xl tw:font-bold tw:text-slate-900">
        {cardValue}
      </p>

      {
        cardLink && (
          <Link
            to={cardLink}
            className="tw:mt-1 tw:inline-block tw:text-sm tw:text-blue-600 tw:hover:underline"
          >
            {cardLinkText}
          </Link>
        )
      }
    </div>
  );
};

export default Dashboardcard;