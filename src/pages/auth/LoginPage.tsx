import {BorderlessTableOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined} from "@ant-design/icons";
import {Button, Checkbox, Col, Flex, Form, FormProps, Input, Row, Typography} from "antd";
import {useCallback, useEffect, useState} from "react";
import {basePostRequest} from "../../requests";
import {AccountModel} from "../../models/AccountModel";
import accountStore from "../../stores/AccountStore";
import {sha256} from "js-sha256";
import authStore from "../../stores/AuthStore";
import {useNavigate} from "react-router-dom";

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const textStyle: React.CSSProperties = {
    color: "#4D7D0F",
    fontFamily: "Segoe UI",
};

type LoginModel = {
    email: string;
    password: string;
};

type AuthResult = {
    account: AccountModel;
    accessToken: string;
    refreshToken: string;
};

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken") && authStore.remember) {
            navigate("/");
        }
    }, []);

    // TODO: Разобраться с этими событиями.
    // TODO: Исправить values:any.

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback(async (values: any) => {
        setIsLoading(true);
        console.log("Success:", values);

        const data: LoginModel = {
            email: values.email,
            password: sha256(values.password),
        };

        await basePostRequest<LoginModel, AuthResult>("auth/signin", data).then((result) => {
            if (typeof result !== "string" && result !== undefined) {
                accountStore.account = result.account;
                // TODO: Добавить проверку роли администратора. Мб на бэк.
                if (values.remember) {
                    authStore.setRemember(values.remember);

                    localStorage.setItem("accessToken", result.accessToken);
                    localStorage.setItem("refreshToken", result.refreshToken);
                }

                sessionStorage.setItem("accessToken", result.accessToken);
                sessionStorage.setItem("refreshToken", result.refreshToken);

                authStore.setAuth();
                navigate("/main");
            } else {
                console.log(result !== undefined ? result : "Неизвестная ошибка!");
            }
        });

        setIsLoading(false);
    }, []);

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Row align="middle" style={{height: "100vh"}}>
            <Col span={16} offset={4}>
                <Flex align="center" justify="center" vertical>
                    <Typography.Title level={1} style={textStyle}>
                        EcoAdmin
                    </Typography.Title>
                    <Typography.Title level={3} style={textStyle}>
                        Вход
                    </Typography.Title>
                    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{required: true, message: "Неправильный email!"}]}
                            style={textStyle}
                        >
                            <Input
                                placeholder="Ваш email"
                                size="large"
                                prefix={<MailOutlined />}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Пароль"
                            name="password"
                            rules={[{required: true, message: "Неправильный пароль!"}]}
                        >
                            <Input.Password
                                placeholder="Ваш пароль"
                                size="large"
                                prefix={<BorderlessTableOutlined />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item<FieldType> name="remember" valuePropName="checked">
                            <Checkbox style={textStyle}>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Col>
        </Row>
    );
};

export default LoginPage;
