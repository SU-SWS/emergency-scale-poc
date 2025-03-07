export type CardProps = {
  title: string;
  description: string;
  date: string;
  id: string;
}

export const Card = ({ title, description, date, id}: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <span className="text-black">{id}</span>
      <h2 className="text-black text-xl font-bold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-gray-400 text-sm mt-2">{date}</p>
    </div>
  )
}

export default Card;