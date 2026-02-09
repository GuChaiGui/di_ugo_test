import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import type { Column } from "./Table";

interface FakeRow {
    id: number;
    name: string;
}

const columns: Column<FakeRow>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" }
];


const data: FakeRow[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Emma" },
    { id: 6, name: "Frank" }
];

describe("Table component", () => {
    test("affiche les colonnes", () => {
        render(<Table columns={columns} data={data} />);
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
    });

    test("affiche les lignes de données", () => {
        render(<Table columns={columns} data={data} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    test("pagination activée : affiche seulement 5 lignes", () => {
        render(<Table columns={columns} data={data} pageSize={5} />);
        const rows = screen.getAllByRole("row");
        expect(rows.length).toBe(6); // 1 header + 5 rows
    });

    test("pagination désactivée : affiche toutes les lignes", () => {
        render(<Table columns={columns} data={data} pagination={false} />);
        expect(screen.getByText("Frank")).toBeInTheDocument();
    });

    test("pagination : clique sur page 2", () => {
        render(<Table columns={columns} data={data} pageSize={5} />);
        fireEvent.click(screen.getAllByText("2")[1]); // clique sur le bouton de pagination
        expect(screen.getByText("Frank")).toBeInTheDocument();
    });

});
