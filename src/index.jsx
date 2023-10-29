import React, { useEffect, useState, Fragment } from "react";
import { capitalize, isString, sOrNoS, omit, deepGet } from "./lib/commonUtils";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cloneElement } from "react";
import utilStyles from "./utils.module.scss";

const duration = 250; // default auto-animate duration

/**
 * Generic table component
 * @param objArray {Array} - Array of objects to display in table
 * @param columns {Array} - Array of column names or objects with key as column name and options as value
 * @param actions {Array} - Array of action objects with key as action name and value as element function
 * @param entityName {String} - Name of entity to display in table
 * @param onAction {Function} - Callback function to handle actions
 * @param [options] {Object} - Options object
 *     @param [options.showCount] {Boolean} - Whether to show count of objects in table
 *     @param [options.newLink] {String} - Link to create new entity
 *     @param [options.actionsColumnName] {String} - Custom name for the actions column
 * @returns {JSX.Element} - Generic table component
 * @constructor - GenericTable
 */
function GenericTable({ objArray = null, columns, actions, entityName = "item", onAction = () => {}, ...options }) {
  const [columnSortDirection, setColumnSortDirection] = useState({});
  const [loading, setLoading] = useState(objArray === null);
  const [objArrayState, setObjArrayState] = useState(objArray || []);
  const [tableBody, enableAnimations] = useAutoAnimate();

  if (actions?.length) columns = [...columns, "actions"];

  useEffect(() => {
    sort(columns[0], "asc"); // Default ascending sort on first column
  }, []);

  useEffect(() => {
    animate(() => {
      setObjArrayState(objArray || []);
      setLoading(objArray === null);
      if (objArray) sort(columns[0], "asc"); // Default initial ascending sort on first column
    });
  }, [objArray]);

  const sort = (column, direction) => {
    setObjArrayState((prevObjArrayState) =>
      prevObjArrayState.sort((a, b) => {
        if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
        if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
        return 0;
      }),
    );
    setColumnSortDirection({ [column]: direction });
  };

  const animate = (fn) => {
    enableAnimations(false);
    fn();
    setTimeout(() => enableAnimations(true), duration);
  };

  const { showCount, newLink, actionsColumnName } = options;

  return (
    <div
      className={`${utilStyles.reactGenericTable} react-generic-table rgt-tw-flex rgt-tw-flex-col rgt-tw-items-center rgt-tw-overflow-y-hidden`}
    >
      <table className="rgt-tw-relative rgt-tw-mx-auto rgt-tw-table-auto rgt-tw-text-neutral-900 dark:rgt-tw-text-neutral-100">
        <thead className="rgt-tw-bg-neutral-200 dark:rgt-tw-bg-neutral-700">
          <tr>
            {columns.map((col) => {
              let isActionsColumn = false;
              let colName = isString(col) ? col : Object.values(col)[0].alias || Object.keys(col)[0];
              const colProp = isString(col) ? col : Object.keys(col)[0];
              if (colName === "actions") {
                colName = actionsColumnName || colName;
                isActionsColumn = true;
              }

              return (
                <th key={colName} className="rgt-tw-p-3 sm:rgt-tw-p-4">
                  <div className="rgt-tw-flex rgt-tw-justify-center rgt-tw-gap-2">
                    <p className="rgt-tw-font-bold">{capitalize(colName)}</p>
                    {columnSortDirection[colProp] === "asc" && (
                      <ChevronDownIcon
                        onClick={() => sort(colProp, "desc")}
                        className="rgt-tw-h-6 rgt-tw-w-6 rgt-tw-cursor-pointer"
                      />
                    )}
                    {columnSortDirection[colProp] === "desc" && (
                      <ChevronUpIcon
                        onClick={() => sort(colProp, "asc")}
                        className="rgt-tw-h-6 rgt-tw-w-6 rgt-tw-cursor-pointer"
                      />
                    )}
                    {!isActionsColumn && !columnSortDirection[colProp] && (
                      <ChevronUpDownIcon
                        onClick={() => sort(colProp, "asc")}
                        className="rgt-tw-h-6 rgt-tw-w-6 rgt-tw-cursor-pointer"
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className="rgt-tw-bg-neutral-50 after:rgt-tw-absolute after:rgt-tw-bottom-0 after:rgt-tw-left-0 after:rgt-tw-h-[2px] after:rgt-tw-w-full after:rgt-tw-bg-neutral-400 dark:rgt-tw-bg-neutral-800"
          ref={tableBody}
        >
          {!objArrayState.length && (
            <tr>
              <td className="rgt-tw-sm:p-4 rgt-tw-p-2" colSpan={columns.length}>
                <div className="rgt-tw-flex rgt-tw-justify-center rgt-tw-gap-2">
                  {loading ? <Loader className="rgt-tw-mx-auto rgt-tw-my-24" /> : `No ${entityName}s found.`}
                  {newLink && !loading && <IconLink title={`New ${entityName}`} href={newLink} Icon={PlusIcon} />}
                </div>
              </td>
            </tr>
          )}
          {objArrayState.map((obj) => (
            <GenericTableDataRow
              key={obj.id}
              obj={obj}
              columns={columns}
              actions={actions}
              onRowAction={(...params) => onAction(...params, entityName)}
            />
          ))}
        </tbody>
        {(showCount || newLink) && (
          <tfoot>
            <tr>
              {newLink && (
                <td colSpan={!showCount ? columns.length : 1}>
                  <IconLink title={`New ${entityName}`} label="Add new" href={newLink} Icon={PlusIcon} />
                </td>
              )}
              {showCount && (
                <>
                  {columns.length > 2 && <td colSpan={columns.length - (newLink ? 2 : 1)} />}
                  <td className="rgt-tw-text-end">
                    {objArrayState.length} {capitalize(entityName) + sOrNoS(objArrayState.length)}
                  </td>
                </>
              )}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

const colPropsToOmit = ["className", "key", "alias", "capitalize"];

function GenericTableDataRow({ obj, columns, actions, onRowAction }) {
  const objColumnMap = {};

  columns.forEach((col) => {
    const [[colName, colProps]] = isString(col) ? [[col]] : Object.entries(col);
    if (colName === "actions") {
      objColumnMap[colName] = { colProps, value: actions }; // Value of actions column are the actions itself
    } else {
      objColumnMap[colName] = { colProps, value: deepGet(obj, colName) };
    }
  });

  const formatActions = (name, value) =>
    value.map((actionObj) => {
      const [[action, elementFunc]] = Object.entries(actionObj);
      if (typeof elementFunc !== "function") {
        console.warn(`No element function provided for action ${actionObj}`);
        return null;
      }
      return cloneElement(elementFunc(obj), {
        onClick: elementFunc(obj).props.onClick
          ? () => {
              elementFunc(obj).props.onClick();
              onRowAction(action, obj);
            }
          : () => onRowAction(action, obj),
        key: action,
      });
    });

  return (
    <tr className="rgt-tw-relative after:rgt-tw-absolute after:rgt-tw-left-0 after:rgt-tw-h-[2px] after:rgt-tw-w-full after:rgt-tw-bg-neutral-400">
      {Object.entries(objColumnMap).map(([colName, colData]) => {
        const { value, colProps } = colData;
        return colName === "actions" ? (
          <td key={colName} className="rgt-tw-p-3 sm:rgt-tw-p-4">
            <div className="rgt-tw-flex rgt-tw-justify-center rgt-tw-gap-2">{formatActions(colName, value)}</div>
          </td>
        ) : (
          <td
            key={colName}
            className={`rgt-tw-p-3 sm:rgt-tw-p-4 ${colProps?.className}`}
            {...omit(colProps, colPropsToOmit)}
          >
            {colProps?.capitalize === false ? value.toString() : capitalize(value)}
          </td>
        );
      })}
    </tr>
  );
}

function IconLink({ href = "", onClick, Icon, title, label, ...props }) {
  return (
    <a
      className="rgt-tw-group rgt-tw-flex rgt-tw-underline rgt-tw-decoration-transparent rgt-tw-transition-colors rgt-tw-duration-300 rgt-tw-ease-in-out hover:rgt-tw-decoration-inherit hover:rgt-tw-duration-100 touch:rgt-tw-decoration-inherit"
      href={href}
      onClick={onClick}
      title={title ? title : "New"}
      {...props}
    >
      {label && <span>{label}</span>}
      <Icon className="rgt-tw-h-6 rgt-tw-w-6 rgt-tw-transition-transform rgt-tw-duration-300 active:rgt-tw-scale-95 group-hover:rgt-tw-scale-[120%] group-hover:rgt-tw-duration-75" />
    </a>
  );
}

function Loader({ className }) {
  return (
    <svg
      className={`${className} rgt-tw-h-16 rgt-tw-w-16 rgt-tw-animate-spin dark:rgt-tw-text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="rgt-tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path className="rgt-tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

export default GenericTable;
