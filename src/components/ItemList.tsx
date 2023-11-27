import { Form, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export type item = {
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
  ventasExentas: number;
  ventasGravadas: number;
  tipoImpuesto: string;
};

export function ItemList({
  items,
  setItems,
}: {
  items: item[];
  setItems: (items: item[]) => void;
}) {
  const addItem = () => {
    setItems([...items, form.getValues()]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const form = useForm<item>({
    defaultValues: {
      cantidad: 0,
      descripcion: "",
      precioUnitario: 0,
      ventasExentas: 0,
      ventasGravadas: 0,
      tipoImpuesto: "15",
    },
  });

  return (
    <div>
      <Form {...form}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Items</h3>
          <div className="flex gap-4 w-full">
            <FormField
              control={form.control}
              name="cantidad"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Desscripcion</FormLabel>
                  <FormControl>
                    <Input
                    placeholder="Descripción del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="precioUnitario"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Precio Unitario</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ventasExentas"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Ventas Exentas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ventasGravadas"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Ventas Gravadas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipoImpuesto"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Tipo de Impuesto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de impuesto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="15">
                        Impuesto Sobre Ventas 15%
                      </SelectItem>
                      <SelectItem value="18">
                        Impuesto Sobre Ventas 18%
                      </SelectItem>
                      <SelectItem value="0">Exento</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            onClick={() => {
              addItem();
              form.reset();
            }}
          >
            Agregar Item
          </Button>
        </div>
      </Form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cantidad</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead className="w-[100px] text-right">
              Precio Unitario
            </TableHead>
            <TableHead className="w-[100px] text-right">
              Ventas Exentas
            </TableHead>
            <TableHead className="w-[100px] text-right">
              Ventas Gravadas
            </TableHead>
            <TableHead className="w-[100px] text-right">
              Tipo de Impuesto
            </TableHead>
            <TableHead className="w-[100px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{item.cantidad}</TableCell>
              <TableCell>{item.descripcion}</TableCell>
              <TableCell className="text-right">
                {item.precioUnitario}
              </TableCell>
              <TableCell className="text-right">{item.ventasExentas}</TableCell>
              <TableCell className="text-right">
                {item.ventasGravadas}
              </TableCell>
              <TableCell className="text-right">{item.tipoImpuesto}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => removeItem(i)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              className="font-medium text-right"
              colSpan={3}
            >
              Totales
            </TableCell>
            <TableCell className="text-right">
              {items.reduce((acc, item) => acc + item.ventasExentas, 0)}
            </TableCell>
            <TableCell className="text-right">
              {items.reduce((acc, item) => acc + item.ventasGravadas, 0)}
            </TableCell>
            <TableCell
              className="text-right"
              colSpan={2}
            ></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
