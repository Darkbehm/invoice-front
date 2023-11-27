import { ItemList } from "@/components/ItemList";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewInvoiceType, newInvoiceSchema } from "@/types/schemas/invoice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function NewInvoice() {
  const form = useForm<NewInvoiceType>({
    resolver: zodResolver(newInvoiceSchema),
    defaultValues: {
      descuentosRebajas: 0,
      tipoPago: "E",
    },
  });

  const onSubmit = async (data: NewInvoiceType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold mb-8">Generar nueva factura</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <h3 className="text-xl font-bold mb-4">Datos del cliente</h3>
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="nombreCliente"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre del cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identificacionCliente"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Identificación del cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ID del cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="direccionCliente"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Dirección del cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dirección del cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rtnCliente"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>RTN del cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0801199900000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-xl font-bold">Datos de la factura</h3>

        <FormField
          control={form.control}
          name="items"
          defaultValue={[]}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items</FormLabel>
              <FormControl>
                <ItemList 
                  items={field.value}
                  setItems={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descuentosRebajas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descuentos o Rebajas</FormLabel>
              <FormControl>
                <Input
                  placeholder="Descuentos o Rebajas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Input
                  placeholder="Observaciones"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-xl font-bold">Otra información</h3>

        <FormField
          control={form.control}
          name="numeroOrdenCompraExenta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Orden de Compra Exenta</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número de Orden de Compra Exenta"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numeroConstanciaRegistroExonerado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Constancia de Registro Exonerado</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número de Constancia de Registro Exonerado"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numeroRegistroSag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Registro SAG</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número de Registro SAG"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-xl font-bold">Pago</h3>
        <FormField
          control={form.control}
          name="tipoPago"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de pago</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de pago" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="E">Efectivo</SelectItem>
                  <SelectItem value="T">Tarjeta</SelectItem>
                  <SelectItem value="C">Cheque</SelectItem>
                  <SelectItem value="O">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Generar factura</Button>
      </form>
    </Form>
  );
}
