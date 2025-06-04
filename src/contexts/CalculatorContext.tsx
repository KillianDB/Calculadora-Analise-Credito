import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface CalculatorContextType {
  parameters: Record<string, any>;
  loading: boolean;
  loadParameters: () => Promise<void>;
}

interface CalculatorProviderProps {
  children: ReactNode;
}

interface Coeficiente {
  id: string;
  menu: string;
  submenu: string;
  values: {
    [key: string]: {
      description: string;
      value: number;
    };
  };
}
const CalculatorContext = createContext<CalculatorContextType>({
  parameters: {},
  loading: true,
  loadParameters: async () => {},
});

export const CalculatorProvider = ({ children }: CalculatorProviderProps) => {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const loadParameters = async () => {
    try {
      const cached = localStorage.getItem("calculatorParams");
      console.log("Cached parameters => ", cached);
      if (cached) {
        setParameters(JSON.parse(cached));
      }

      const response = await fetch(
        "https://api.creditorealsf.com/coefficients/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Response status => ", response.status);
      const data = await response.json();
      console.log("Response data => ", data);

      const paramsMap = data.reduce((acc: any, param: any) => {
        console.log("Parameter => ", param);
        if (!acc[param.menu]) {
          acc[param.menu] = {};
        }

        // Armazena os valores do coeficiente sob o submenu
        // EXERCITO:
        // Cálculo por Margem Disponível:
        //   id:"YQof7uIMt88tdALmFjDZ"
        //   values:Array(2)
        //     0:{key: 'coeficiente_emprestimo', value: 0.0402, description: ' '}
        //     1:{key: 'porcentagem_margem_emprestimo', value: 0.4, description: ' '}
        acc[param.menu][param.submenu] = {
          id: param.id,
          values: Object.entries(param.values).map(
            ([key, value]: [string, any]) => ({
              key,
              value: value.value,
              description: value.description,
            })
          ),
        };

        return acc;
      }, {});

      setParameters(paramsMap);
      localStorage.setItem("calculatorParams", JSON.stringify(paramsMap));
      console.log("Parameters loaded successfully", paramsMap);
    } catch (error) {
      console.error("Parameter load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Loading calculator parameters...");
    loadParameters();
  }, []);

  return (
    <CalculatorContext.Provider value={{ parameters, loading, loadParameters }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorParams = () => useContext(CalculatorContext);
